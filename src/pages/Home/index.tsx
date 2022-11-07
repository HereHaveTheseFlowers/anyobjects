import { Footer, Header, Button, FiltersTab, ObjectGrid } from '../../components';

export default function Home() {
    let lastScrollTimer = 0;
    window.onscroll = function() {
        lastScrollTimer++;
        if(lastScrollTimer > 10) {
            lastScrollTimer = 0;
            const distanceScrolled = document.documentElement.scrollTop;
            if (distanceScrolled > 30) {
                const arrow = document.querySelector('.home__arrow') as HTMLElement;
                arrow.style.opacity = '1';
            } else {
                const arrow = document.querySelector('.home__arrow') as HTMLElement;
                arrow.style.opacity = '0';
            }
        }
    }

    const handleArrow = () => {
        window.scrollTo(0, 0);
        const arrow = document.querySelector('.home__arrow') as HTMLElement;
        arrow.style.opacity = '0';
    }

    return (
        <>
            <Header logoSize={'big'} />
            <h1 className='home__h1'>
                ∀ НУ — КУРАТОРСКИЙ ПРОЕКТ ПРО РОССИЙСКОЕ ПРОИЗВОДСТВО. МЫ СОЗДАЛИ АРХИВ ОБЪЕКТОВ, КОТОРЫЕ МЫ НАШЛИ КРАСИВЫМИ.
            </h1>
            <FiltersTab />
            <ObjectGrid />
            <Footer />
            <button className="home__arrow" onClick={handleArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="30">
                    <path d="m8 .96 7.19 7.19-1.56 1.55L9.2 5.29v23.75H6.8V5.29l-4.39 4.4-1.6-1.57L8 .96Z"/>
                </svg>
            </button>
        </>
    )
}
