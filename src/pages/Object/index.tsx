import { useParams } from "react-router-dom";
import { Header, FiltersTab, Anchor, Button, Footer } from "../../components";
import store from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RouterList } from "../../router/routerList";
import checkFlexGap from "../../utils/checkFlexGap";
import { ObjectProps } from "../../api/firestoreController";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}
export default function Object() {
  let { id } = useParams();
  const forceUpdate = useForceUpdate();
  store.on("objects", forceUpdate);
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!checkFlexGap()) {
      document.querySelector(".object")?.classList.add("no-flexbox-gap");
      document
        .querySelector(".object__header")
        ?.classList.add("no-flexbox-gap");
      document.querySelector(".object__links")?.classList.add("no-flexbox-gap");
      document.querySelector(".object__info")?.classList.add("no-flexbox-gap");
    }
  });

  if (store.getState().objects && store.getState().objects[id]) {
    const currentObject: ObjectProps = store.getState().objects[id];
    const handleNavigateCategory = () => {
      store.set("filter", currentObject.category);
      navigate(RouterList.HOME);
    };

    const isTablet: boolean = window.matchMedia(
      "(max-device-width: 1024px)",
    ).matches;
    const isMobile: boolean = window.matchMedia(
      "(max-device-width: 480px)",
    ).matches;

    const handleImageLoaded = () => {
      setImageLoading(false);
    };
    if (!currentObject.mainimage || imageLoading) {
      let skeletonImageResponsiveStyles = {};
      if (isMobile) {
        skeletonImageResponsiveStyles = {
          flexBasis: "100%",
          height: "auto",
          width: "100%",
        };
      } else if (isTablet) {
        skeletonImageResponsiveStyles = { height: "50%" };
      }

      return (
        <>
          <Header logoSize="small" />
          <FiltersTab noSticky={true} buttonBack={true} />
          <section
            className={`object ${isMobile ? "object_responsive_mobile" : ""}`}
          >
            <img
              src={currentObject.mainimage}
              alt={currentObject.alttext}
              className="object__image image_visibility_hidden"
              onLoad={() => {
                handleImageLoaded();
              }}
              draggable="false"
            />
            <div
              className="skeleton-image"
              style={{
                height: "68vh",
                width: "68vh",
                ...skeletonImageResponsiveStyles,
              }}
            ></div>
            <div className="object__card">
              <div className="object__info">
                <div className="object__header">
                  <span
                    className="object__name skeleton-box"
                    style={{ width: "30%" }}
                  />
                  <span
                    className="object__brand skeleton-box"
                    style={{ width: "20%" }}
                  />
                  <span
                    className="object__price skeleton-box"
                    style={{ width: "20%" }}
                  />
                </div>
                <span
                  className="object__description skeleton-box"
                  style={{ width: "50%" }}
                />
                <span
                  className="object__additionalinfo skeleton-box"
                  style={{ width: "30%" }}
                />
              </div>
              {(!isTablet || isMobile) && (
                <div className="object__links">
                  <span className="skeleton-box" style={{ width: "55%" }} />
                  <span className="skeleton-box" style={{ width: "45%" }} />
                </div>
              )}
            </div>
          </section>
          {isTablet && !isMobile && (
            <div className="object__links">
              <span className="skeleton-box" style={{ width: "55%" }} />
              <span className="skeleton-box" style={{ width: "45%" }} />
            </div>
          )}
          {isTablet && !isMobile && <Footer />}
        </>
      );
    } else {
      return (
        <>
          <Header logoSize="small" />
          <FiltersTab noSticky={true} buttonBack={true} />
          <section className="object">
            <img
              src={currentObject.mainimage}
              alt={currentObject.alttext}
              className="object__image object__image_loaded"
              draggable="false"
            />
            <div className="object__card">
              <div className="object__info">
                <div className="object__header">
                  <span className="object__name">{currentObject.brand}</span>
                  <span className="object__brand">{currentObject.name}</span>
                  <span className="object__price">{currentObject.price}₽</span>
                </div>
                <span className="object__description">
                  {currentObject.description}
                </span>
                <span className="object__additionalinfo">
                  {currentObject.additionalinfo}
                </span>
              </div>
              {(!isTablet || isMobile) && (
                <div className="object__links">
                  <span className="object__url">
                    КУПИТЬ НА САЙТЕ{" "}
                    <Anchor href={currentObject.url}>
                      {currentObject.urltext}
                    </Anchor>
                  </span>
                  <span className="object__nav">
                    СМОТРЕТЬ ВСЕ ОБЪЕКТЫ ИЗ КАТЕГОРИИ{" "}
                    <Button
                      className="object__nav-button"
                      onClick={handleNavigateCategory}
                    >
                      {currentObject.category}
                    </Button>
                  </span>
                </div>
              )}
            </div>
          </section>
          {isTablet && !isMobile && (
            <div className="object__links">
              <span className="object__url">
                КУПИТЬ НА САЙТЕ{" "}
                <Anchor href={currentObject.url}>
                  {currentObject.urltext}
                </Anchor>
              </span>
              <span className="object__nav">
                СМОТРЕТЬ ВСЕ ОБЪЕКТЫ ИЗ КАТЕГОРИИ{" "}
                <Button
                  className="object__nav-button"
                  onClick={handleNavigateCategory}
                >
                  {currentObject.category}
                </Button>
              </span>
            </div>
          )}
          {isTablet && !isMobile && <Footer />}
        </>
      );
    }
  }
  return (
    <>
      <Header logoSize="small" />
      <FiltersTab noSticky={true} buttonBack={true} />
    </>
  );
}
