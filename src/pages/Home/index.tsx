import {
  Footer,
  Header,
  Button,
  FiltersTab,
  ObjectGrid,
} from "../../components";
import { useRef, useEffect } from "react";

export default function Home() {
  const arrowRef = useRef(null);

  let lastScrollTimer = 0;
  useEffect(() => {
    window.onscroll = function () {
      lastScrollTimer++;
      if (lastScrollTimer > 10) {
        lastScrollTimer = 0;
        const distanceScrolled = document.documentElement.scrollTop;
        if (distanceScrolled > 30) {
          if (arrowRef && arrowRef.current)
            arrowRef.current.style.opacity = "1";
        } else {
          if (arrowRef && arrowRef.current)
            arrowRef.current.style.opacity = "0";
        }
      }
    };
    return () => {
      window.onscroll = null;
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
      <ObjectGrid />
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
