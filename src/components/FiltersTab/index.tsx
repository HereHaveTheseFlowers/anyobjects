import { Button } from "components/Button";
import store from "utils/Store";
import { useNavigate } from "react-router-dom";
import { RouterList } from "router/routerList";
import { useEffect } from "react";
import checkFlexGap from "utils/checkFlexGap";
import {
  filterLabels,
  mobileBreakpointPx,
} from "appConstants";

type FiltersTabProps = {
  noSticky?: boolean | string;
  buttonBack?: boolean;
};

const FILTERS_TAB_FILTERS_SELECTOR = ".filters-tab__filters";
const FILTERS_TAB_SELECTOR = ".filters-tab";

function updateFiltersState() {
  if (window.location.pathname === RouterList.ABOUT) {
    return;
  }
  const buttons = document.querySelectorAll(".filters-tab__filter");
  const currentFilter = store.getState().filter;
  for (const button of buttons) {
    const text = button.textContent?.replaceAll("\xa0", " ") ?? "";
    const isChosen =
      (!currentFilter && text === filterLabels.all) ||
      text === currentFilter;
    if (isChosen) {
      button.classList.add("button_state_chosen");
    } else {
      button.classList.remove("button_state_chosen");
    }
  }
}

export function FiltersTab(props: FiltersTabProps) {
  const stickyClass = props.noSticky ? "" : " filters-tab_position_sticky";
  const navigate = useNavigate();

  useEffect(() => {
    updateFiltersState();
    if (!checkFlexGap()) {
      document
        .querySelector(FILTERS_TAB_FILTERS_SELECTOR)
        ?.classList.add("no-flexbox-gap");
      document.querySelector(FILTERS_TAB_SELECTOR)?.classList.add("no-flexbox-gap");
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const buttonBack = props.buttonBack ? (
    <button
      className="filters-tab__back-button"
      onClick={handleGoBack}
      aria-label="Иконка стрелочки назад"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20">
        <path d="m.96 10 7.19-7.19L9.7 4.37 5.29 8.8h23.75v2.4H5.29l4.41 4.39-1.57 1.6L.96 10Z" />
      </svg>
    </button>
  ) : null;

  const applyFilter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (window.location.pathname !== RouterList.HOME) {
      navigate(RouterList.HOME);
    }
    const element = event.target as HTMLButtonElement;
    store.set("filter", element.textContent?.replaceAll("\xa0", " ") ?? "");
    updateFiltersState();
  };

  const isMobile = window.matchMedia(
    `(max-device-width: ${mobileBreakpointPx}px)`,
  ).matches;

  return (
    <div className={`filters-tab${stickyClass}`}>
      {!isMobile && buttonBack}
      <span className="filters-tab__filters">
        <Button onClick={applyFilter} className="filters-tab__filter">
          {filterLabels.all}
        </Button>
        <Button onClick={applyFilter} className="filters-tab__filter">
          {filterLabels.interior}
        </Button>
        <Button onClick={applyFilter} className="filters-tab__filter">
          {filterLabels.hygiene}
        </Button>
        {!isMobile && (
          <>
            <Button onClick={applyFilter} className="filters-tab__filter">
              {filterLabels.clothingAndAccessories.replace(/ /g, "\u00a0")}
            </Button>
            <Button onClick={applyFilter} className="filters-tab__filter">
              {filterLabels.food}
            </Button>
          </>
        )}
      </span>
      {isMobile && (
        <span className="filters-tab__filters">
          <Button onClick={applyFilter} className="filters-tab__filter">
            {filterLabels.clothingAndAccessories.replace(/ /g, "\u00a0")}
          </Button>
          <Button onClick={applyFilter} className="filters-tab__filter">
            {filterLabels.food}
          </Button>
        </span>
      )}
    </div>
  );
}
