import { Footer, Header, Button, Anchor, FiltersTab } from '../../components';
import store from '../../utils/Store';
import maers from '../../assets/img/maers.png';
import evgeny from '../../assets/img/evgeny.png';
import polin from '../../assets/img/polin.png';
import frank from '../../assets/img/frank.png';

export default function About() {
    store.set('filter', 'ВСЁ')
    return (
        <>
            <Header logoSize='small' />
            <FiltersTab noSticky={true} />
            <h1 className='about__h1'>
                МЫ — АМБИЦИОЗНАЯ КОМАНДА ДИЗАЙНЕРОВ И НЕ-ДИЗАЙНЕРОВ. 
                МЫ ЛЮБИМ КРУТЫЕ РОССИЙСКИЕ ПРОЕКТЫ. 
                НАША ЦЕЛЬ — НАСЫЩАТЬ КУЛЬТУРУ КРАСИВЫМ И ПОЛЕЗНЫМ. 
                ВОТ НАШ  <Anchor href="http://normcultura.agency">САЙТ</Anchor>. 
                ВОТ НАША  <Anchor href="mailto:normcultura@gmail.com">ПОЧТА</Anchor>.
                <br /><br />
                КУРАТОРЫ ОБЪЕКТОВ:
            </h1>
            <section className='curators'>
                <article className='curators__profile'>
                    <img src={maers} alt="Маша Сиверс" className="curators__avatar" draggable="false" />
                    <div className="curators__info">
                        <div className="curators__title">
                            <span className="curators__name">МАША СИВЕРС</span>
                            <span className="curators__occupation">ДИЗАЙНЕР</span>
                        </div>
                        <span className="curators__description">
                            are.na, html, Белла Хадид, коммунизм, NTS, «Тошнота» Сартра, вода с лимоном, Спайк Йонзе и Чарли Кауфман, 
                            шахматы, ГОСТ звук, A24, прозрачные стаканы, kolonna publications, современный фолк, Fleabag, emergency intercom, кулинария, Стив Джобс, 032c, красивые стулья, 
                            жесткий эмбиент, letterboxd, мягкое освещение, JPEGMAFIA, серый цвет, Nathan For You, бетон.
                        </span>
                        <span className="curators__favobject">
                            ЛЮБИМЫЙ ОБЪЕКТ: <Anchor href='../object/6' className="curators__favobject-anchor">КОМПЛЕКТ БАЗОВОГО БЕЛЬЯ SHU</Anchor>
                        </span>
                    </div>
                </article>
                <article className='curators__profile'>
                    <img src={polin} alt="Полина" className="curators__avatar" draggable="false" />
                    <div className="curators__info">
                        <div className="curators__title">
                            <span className="curators__name">ПОЛИНА</span>
                            <span className="curators__occupation">ДИЗАЙНЕР, ДИДЖЕЙ</span>
                        </div>
                        <span className="curators__description">
                            Огонёк, Брат 2, Паша Техник, The Temporary State, шахматы, Изич, типографика, VAC, завтраки, вода, USHATAVA, verlé, Figma, ладан, чистить зубы, зелёный чай, дёнер с халуми, 
                            ванна с пеной, баня, Россия, фильтр кофе, здание ЦГАКФФД СПб, раковины, syg.ma, церкви, тяжелое одеяло, скамить.
                        </span>
                        <span className="curators__favobject">
                            ЛЮБИМЫЙ ОБЪЕКТ: <Anchor href='../object/3' className="curators__favobject-anchor">НАБОР ДРИПОВ VERLÉ</Anchor>
                        </span>
                    </div>
                </article>
                <article className='curators__profile'>
                    <img src={evgeny} alt="Женя" className="curators__avatar" draggable="false" />
                    <div className="curators__info">
                        <div className="curators__title">
                            <span className="curators__name">ЖЕНЯ</span>
                            <span className="curators__occupation">ПИАРЩИК, ДИДЖЕЙ</span>
                        </div>
                        <span className="curators__description">
                            USHATAVA, Земфира, Coca-Cola, Москва, бильярд, штучки, avgvst, флэт уайт, 
                            Issey Miyake, свойство, техно, Гаспар Ноэ, белый цвет, мама и папа, Underdog, яхты, админить телеграм каналы.
                        </span>
                        <span className="curators__favobject">
                            ЛЮБИМЫЙ ОБЪЕКТ: <Anchor href='../object/8' className="curators__favobject-anchor">МЫЛО PATTISSONCHA</Anchor>
                        </span>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    )
}
