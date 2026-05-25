import { useEffect, useState } from "react";
import store from "utils/Store";
import { checkAuth } from "api/objectsApi";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(!!store.getState().auth);

  useEffect(() => {
    let isMounted = true;

    checkAuth().then((authenticated) => {
      if (!isMounted) {
        return;
      }
      if (authenticated) {
        store.set("auth", "admin");
      }
      setIsAuth(authenticated || !!store.getState().auth);
      setIsReady(true);
    });

    const unsubscribe = store.on("auth", () => {
      setIsAuth(!!store.getState().auth);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return isAuth ? children : <>Нет доступа</>;
}
