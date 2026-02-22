import "./assets/fonts/fonts.css";
import "./utils/modern-normalize.css";
import "./styles.sass";
import "core-js/stable";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ObjectProps } from "./api/firestoreController";
import store from "./utils/Store";
import FirestoreController from "./api/firestoreController";
import {
  mockObjectsCount,
  viewportResizeDebounceMs,
} from "./appConstants";

const emptyObjectProps: ObjectProps = {
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
  mainimage: "",
  previewimage: "",
};

/* Mobile viewport height hack */
let timeoutId: NodeJS.Timeout | null = null;
const documentHeight = () => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  }, viewportResizeDebounceMs);
};
documentHeight();
window.addEventListener("resize", documentHeight);

for (let i = 1; i <= mockObjectsCount; i++) {
  store.set(`objects.${i}`, { ...emptyObjectProps });
}

FirestoreController.updateObjects();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
