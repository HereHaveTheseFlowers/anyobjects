import store from "utils/Store";
import type { ObjectProps } from "api/objectTypes";

const apiBase = "/api";

const apiFetch = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  return fetch(`${apiBase}${path}`, {
    credentials: "include",
    ...options,
  });
};

const toAbsoluteUrl = (path: string | null | undefined): string | null => {
  if (!path) {
    return null;
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await apiFetch("/auth_check.php");
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.authenticated === true;
  } catch {
    return false;
  }
};

export const login = async (
  loginValue: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  const body = new FormData();
  body.append("login", loginValue);
  body.append("password", password);

  const response = await apiFetch("/auth_login.php", {
    method: "POST",
    body,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    return { success: false, error: data?.error ?? "login_failed" };
  }

  store.set("auth", "admin");
  return { success: true };
};

export const logout = async (): Promise<void> => {
  await apiFetch("/auth_logout.php", { method: "POST" });
  store.set("auth", null);
};

export const loadObjectsIntoStore = async (): Promise<void> => {
  const response = await apiFetch("/objects.php");
  if (!response.ok) {
    console.error("Не удалось загрузить объекты");
    return;
  }

  const data = await response.json();
  if (!data?.objects || !Array.isArray(data.objects)) {
    return;
  }

  const nextObjects: Record<string, ObjectProps> = {};

  for (const object of data.objects as ObjectProps[]) {
    nextObjects[object.position] = {
      ...object,
      mainimage: toAbsoluteUrl(object.mainimage),
      previewimage: toAbsoluteUrl(object.previewimage),
    };
  }

  store.set("objects", nextObjects);
};

export const buildObjectFormDataFromAdmin = (
  fd: FormData,
): FormData | null => {
  const fields: Record<string, string> = {
    position: "",
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    additionalinfo: "",
    url: "",
    urltext: "",
    alttext: "",
  };

  for (const pair of fd.entries()) {
    if (typeof pair[1] === "string") {
      const fieldName = pair[0].replace("object", "");
      if (fieldName in fields) {
        fields[fieldName] = pair[1].replaceAll("[ПЕРЕНОС]", "\n");
      }
    }
  }

  const apiFormData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    apiFormData.append(key, value);
  }

  for (const pair of fd.entries()) {
    if (pair[0] === "objectmainimage" && pair[1] instanceof File && pair[1].size > 0) {
      apiFormData.append("main_image", pair[1]);
    }
    if (pair[0] === "objectpreviewimage" && pair[1] instanceof File && pair[1].size > 0) {
      apiFormData.append("preview_image", pair[1]);
    }
  }

  return apiFormData;
};

export const saveObject = async (fd: FormData): Promise<boolean> => {
  const apiFormData = buildObjectFormDataFromAdmin(fd);
  if (!apiFormData) {
    return false;
  }

  const response = await apiFetch("/save_object.php", {
    method: "POST",
    body: apiFormData,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    return false;
  }

  await loadObjectsIntoStore();
  return true;
};

export const deleteObject = async (position: string): Promise<boolean> => {
  const body = new FormData();
  body.append("position", position);

  const response = await apiFetch("/delete_object.php", {
    method: "POST",
    body,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    return false;
  }

  await loadObjectsIntoStore();
  return true;
};
