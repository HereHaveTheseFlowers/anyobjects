import store from "../utils/Store";
import { useState } from "react";
import FirestoreController from "../api/firestoreController";
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export function withPrivateRoute(children: JSX.Element) {
  const forceUpdate = useForceUpdate();
  const isAuth = store.getState().auth;
  store.on("auth", forceUpdate);
  FirestoreController.CheckUser();

  return isAuth ? children : <>Нет доступа</>;
}
