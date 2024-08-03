import { Footer, Header, Button, Anchor, FiltersTab } from "../../components";
import store from "../../utils/Store";
import sievers from "../../assets/img/sievers.jpg";
import polinchik from "../../assets/img/polinchik.jpg";
import lomov from "../../assets/img/lomov.jpg";

export default function About() {
  store.set("filter", "ВСЁ");
  return (
    <>
      <Header logoSize="small" />
      <FiltersTab noSticky={true} />
      <h1 className="about__h1">
        МЫ — АМБИЦИОЗНАЯ КОМАНДА ДИЗАЙНЕРОВ И НЕ-ДИЗАЙНЕРОВ. МЫ ЛЮБИМ ХОРОШИЕ
        РОССИЙСКИЕ ПРОЕКТЫ. НАША ЦЕЛЬ — НАСЫЩАТЬ КУЛЬТУРУ КРАСИВЫМ И ПОЛЕЗНЫМ.
        <br />
        ВОТ НАШ ВРЕМЕННЫЙ <Anchor href="http://normcultura.agency">САЙТ</Anchor>
        . ВОТ НАША <Anchor href="mailto:normcultura@gmail.com">ПОЧТА</Anchor>.
        <br />
        <br />
        КУРАТОРЫ ОБЪЕКТОВ:
      </h1>
      <section className="curators">
        <article className="curators__profile">
          <img
            src={sievers}
            alt="Маша Сиверс"
            className="curators__avatar"
            draggable="false"
          />
          <div className="curators__info">
            <div className="curators__title">
              <span className="curators__name">МАША СИВЕРС</span>
              <span className="curators__occupation">ДИЗАЙНЕР</span>
            </div>
            <span className="curators__description">
              are.na, писать html, Белла Хадид, Nathan For You, коммунизм, NTS
              Radio, «Тошнота» Сартра, вода с лимоном, A24, прозрачные стаканы,
              дизайн, Кауфман и Йонзе, kolonna publications, современный фолк,
              кулинария, Стив Джобс, 032c, красивые стулья, жёсткий эмбиент,
              letterboxd, офисы.
            </span>
            <span className="curators__favobject">
              ЛЮБИМЫЙ ОБЪЕКТ:{" "}
              <Anchor href="../object/9" className="curators__favobject-anchor">
                СТУЛ БРО DELO DESIGN
              </Anchor>
            </span>
          </div>
        </article>
        <article className="curators__profile">
          <img
            src={polinchik}
            alt="Полина"
            className="curators__avatar"
            draggable="false"
          />
          <div className="curators__info">
            <div className="curators__title">
              <span className="curators__name">ПОЛИНА ОВЧИННИКОВА</span>
              <span className="curators__occupation">ДИЗАЙНЕР</span>
            </div>
            <span className="curators__description">
              Сантал, бетон, Владимирская церковь, Figma, вода комнатной
              температуры, чистка зубов, палатки, черный цвет, Паша Техник,
              здание ЦГАКФФД СПБ, шахматы, оружие, чай, The Temporary State,
              Россия, Огонек.
            </span>
            <span className="curators__favobject">
              ЛЮБИМЫЙ ОБЪЕКТ:{" "}
              <Anchor href="../object/3" className="curators__favobject-anchor">
                НАБОР ДРИПОВ VERLÉ
              </Anchor>
            </span>
          </div>
        </article>
        <article className="curators__profile">
          <img
            src={lomov}
            alt="Женя"
            className="curators__avatar"
            draggable="false"
          />
          <div className="curators__info">
            <div className="curators__title">
              <span className="curators__name">ЖЕНЯ ЛОМОВ</span>
              <span className="curators__occupation">ПИАРЩИК, ДИДЖЕЙ</span>
            </div>
            <span className="curators__description">
              USHATAVA, Земфира, Coca-Cola, Москва, бильярд, штучки, avgvst,
              свойство, флэт уайт, Issey Miyake, техно, Гаспар Ноэ, белый цвет,
              мама и папа, яхты, Underdog, админить телеграм каналы.
            </span>
            <span className="curators__favobject">
              ЛЮБИМЫЙ ОБЪЕКТ:{" "}
              <Anchor href="../object/8" className="curators__favobject-anchor">
                МЫЛО PATTISSONCHA
              </Anchor>
            </span>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
}
