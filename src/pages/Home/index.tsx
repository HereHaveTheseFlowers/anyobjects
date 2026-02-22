import {
  Footer,
  Header,
  FiltersTab,
  ObjectGrid,
} from "components";
import { useRef, useEffect } from "react";
import {
  scrollArrowVisibilityThresholdPx,
  scrollThrottleInterval,
} from "appConstants";

export default function Home() {
  const arrowRef = useRef<HTMLButtonElement>(null);
  const scrollThrottleRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollThrottleRef.current += 1;
      if (scrollThrottleRef.current <= scrollThrottleInterval) {
        return;
      }
      scrollThrottleRef.current = 0;
      const distanceScrolled = document.documentElement.scrollTop;
      const isVisible = distanceScrolled > scrollArrowVisibilityThresholdPx;
      if (arrowRef.current) {
        arrowRef.current.style.opacity = isVisible ? "1" : "0";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrow = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header logoSize={"big"} />
      <h1 className="home__h1">
        КУРАТОРСКИЙ ПРОЕКТ ПРО РОССИЙСКИЙ ДИЗАЙН. МЫ СОЗДАЁМ АРХИВ ОБЪЕКТОВ,
        В&nbsp;КОТОРЫХ НАХОДИМ КРАСИВОЕ ИСПОЛНЕНИЕ.
      </h1>
      <FiltersTab />
      <ObjectGrid mode={null} />
      <Footer />
      <button
        className="home__arrow"
        onClick={handleArrow}
        aria-label="Иконка стрелочки вверх"
        ref={arrowRef}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30">
          <path d="m8 .96 7.19 7.19-1.56 1.55L9.2 5.29v23.75H6.8V5.29l-4.39 4.4-1.6-1.57L8 .96Z" />
        </svg>
      </button>
    </>
  );
}
