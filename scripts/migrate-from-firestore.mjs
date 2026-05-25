/**
 * Экспорт объектов из Firestore + скачивание картинок.
 *
 * Порядок источников картинок:
 * 1) Старый статический сайт (SITE_BASE_URL/objects/N/main.png)
 * 2) Публичный URL Firebase Storage (если квота не исчерпана)
 * 3) Firebase Storage SDK (только если USE_FIREBASE_STORAGE=1)
 *
 * npm run migrate:export
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, getBytes } from "firebase/storage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "migration-output");
const uploadsDir = path.join(outputDir, "uploads", "objects");
const jsonPath = path.join(outputDir, "objects.json");

const defaultGithubBase =
  "https://raw.githubusercontent.com/HereHaveTheseFlowers/anyobjects/6f0e29228a014516e0437a4e46d4668554a2f771/public/objects";

const firebaseConfig = {
  apiKey: "AIzaSyD71u_QZkFsr4OXLo7pzll_drU1zED4A6A",
  authDomain: "anyobjects-f24a9.firebaseapp.com",
  projectId: "anyobjects-f24a9",
  storageBucket: "anyobjects-f24a9.appspot.com",
  messagingSenderId: "517309452430",
  appId: "1:517309452430:web:b64660d693011972f6f9df",
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.replaceAll("\\n", "\n");
}

function getExtensionFromBytes(bytes) {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) {
    return "png";
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "jpg";
  }
  if (bytes[0] === 0x47 && bytes[1] === 0x49) {
    return "gif";
  }
  if (bytes[0] === 0x52 && bytes[1] === 0x49) {
    return "webp";
  }
  return "png";
}

function saveImageBuffer(buffer, targetBaseName) {
  const ext = getExtensionFromBytes(buffer);
  const fileName = `${targetBaseName}.${ext}`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);
  return `uploads/objects/${fileName}`;
}

async function downloadFromUrl(url, targetBaseName, silent = false) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (!silent) {
        console.warn(`  ! ${url} → HTTP ${response.status}`);
      }
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 100) {
      return null;
    }
    return saveImageBuffer(buffer, targetBaseName);
  } catch (error) {
    if (!silent) {
      console.warn(`  ! ${url}:`, error.message);
    }
    return null;
  }
}

async function tryDownloadFromGithub(githubBase, position, type) {
  const fileName = type === "main" ? "main.png" : "preview.png";
  const url = `${githubBase}/${position}/${fileName}`;
  return downloadFromUrl(url, `${position}-${type}`, true);
}

async function tryDownloadFromLegacySite(siteBaseUrl, position, type) {
  const fileName = type === "main" ? "main.png" : "preview.png";
  const url = `${siteBaseUrl}/objects/${position}/${fileName}`;
  return downloadFromUrl(url, `${position}-${type}`, true);
}

async function tryDownloadViaPublicFirebaseUrl(position, type) {
  const encodedPath = encodeURIComponent(`images/${type}image${position}`);
  const url = `https://firebasestorage.googleapis.com/v0/b/anyobjects-f24a9.appspot.com/o/${encodedPath}?alt=media`;
  return downloadFromUrl(url, `${position}-${type}`, true);
}

async function downloadStorageImage(storage, storagePath, targetBaseName) {
  try {
    const storageRef = ref(storage, storagePath);
    const bytes = await getBytes(storageRef);
    return saveImageBuffer(Buffer.from(bytes), targetBaseName);
  } catch (error) {
    console.warn(`  ! Storage SDK ${storagePath}:`, error.message);
    return null;
  }
}

async function downloadObjectImages({
  position,
  githubBase,
  siteBaseUrl,
  storage,
  useFirebaseStorage,
}) {
  const tryChain = async (type) => {
    const baseName = `${position}-${type}`;

    let path = await tryDownloadFromGithub(githubBase, position, type);
    if (path) {
      console.log(`  ✓ ${type}: GitHub`);
      return path;
    }

    path = await tryDownloadFromLegacySite(siteBaseUrl, position, type);
    if (path) {
      console.log(`  ✓ ${type}: с сайта`);
      return path;
    }

    path = await tryDownloadViaPublicFirebaseUrl(position, type);
    if (path) {
      console.log(`  ✓ ${type}: Firebase (публичный URL)`);
      return path;
    }

    if (useFirebaseStorage) {
      const storagePath = `/images/${type}image${position}`;
      path = await downloadStorageImage(storage, storagePath, baseName);
      if (path) {
        console.log(`  ✓ ${type}: Firebase Storage SDK`);
        return path;
      }
    }

    console.warn(`  ✗ ${type}: картинка не найдена`);
    return null;
  };

  const mainImage = await tryChain("main");
  const previewImage = await tryChain("preview");

  return { mainImage, previewImage };
}

async function main() {
  loadEnvFile(path.join(__dirname, "migrate.env"));

  const email = process.env.FIREBASE_EMAIL;
  const password = process.env.FIREBASE_PASSWORD;
  const siteBaseUrl = (process.env.SITE_BASE_URL || "https://anyobjects.ru").replace(
    /\/$/,
    "",
  );
  const githubBase = (process.env.GITHUB_OBJECTS_BASE || defaultGithubBase).replace(
    /\/$/,
    "",
  );
  const useFirebaseStorage = process.env.USE_FIREBASE_STORAGE === "1";

  if (!email || !password) {
    console.error(
      "Заполните FIREBASE_EMAIL и FIREBASE_PASSWORD в scripts/migrate.env",
    );
    process.exit(1);
  }

  fs.mkdirSync(uploadsDir, { recursive: true });

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  console.log("Вход в Firebase...");
  await signInWithEmailAndPassword(auth, email, password);

  if (!useFirebaseStorage) {
    console.log(
      "Firebase Storage SDK отключён (квота). Картинки: сайт → публичный URL.",
    );
    console.log("Чтобы включить SDK: USE_FIREBASE_STORAGE=1 в migrate.env\n");
  }

  console.log("Чтение коллекции objects...");
  const snapshot = await getDocs(collection(db, "objects"));

  const objects = [];
  let withImages = 0;
  let missingImages = 0;

  for (const docSnap of snapshot.docs) {
    const raw = docSnap.data();
    const position = String(raw.position ?? docSnap.id);

    console.log(`\nОбъект ${position}: ${raw.name ?? ""}`);

    const { mainImage, previewImage } = await downloadObjectImages({
      position,
      githubBase,
      siteBaseUrl,
      storage,
      useFirebaseStorage,
    });

    if (mainImage && previewImage) {
      withImages++;
    } else {
      missingImages++;
    }

    objects.push({
      position,
      name: normalizeText(raw.name),
      brand: normalizeText(raw.brand),
      price: normalizeText(raw.price),
      category: normalizeText(raw.category),
      description: normalizeText(raw.description),
      additionalinfo: normalizeText(raw.additionalinfo),
      url: normalizeText(raw.url),
      urltext: normalizeText(raw.urltext),
      alttext: normalizeText(raw.alttext),
      main_image: mainImage,
      preview_image: previewImage,
    });
  }

  objects.sort((a, b) => String(a.position).localeCompare(String(b.position)));

  fs.writeFileSync(jsonPath, JSON.stringify({ objects }, null, 2), "utf8");

  const missingListPath = path.join(outputDir, "missing-images.txt");
  const missingLines = objects
    .filter((o) => !o.main_image || !o.preview_image)
    .map(
      (o) =>
        `${o.position} | ${o.name} | main: ${o.main_image ? "ok" : "нет"} | preview: ${o.preview_image ? "ok" : "нет"}`,
    );
  fs.writeFileSync(missingListPath, missingLines.join("\n"), "utf8");

  console.log("\n--- Итог ---");
  console.log(`Объектов: ${objects.length}`);
  console.log(`С обеими картинками: ${withImages}`);
  console.log(`Без части картинок: ${missingImages}`);
  console.log(`JSON: ${jsonPath}`);
  if (missingLines.length > 0) {
    console.log(`Список без картинок: ${missingListPath}`);
  }
  console.log("\nЕсли Firebase Storage заблокирован (quota exceeded):");
  console.log("- Импортируйте objects.json в MySQL (тексты уже есть)");
  console.log("- Картинки дозагрузите через /admin/edit");
  console.log("- Или временно оплатите Firebase Blaze и повторите экспорт");
}

main().catch((error) => {
  console.error("Ошибка миграции:", error);
  process.exit(1);
});
