import { useParams } from 'react-router-dom';
import { Header, FiltersTab, Anchor, Button, Footer } from '../../components';
import store from '../../utils/Store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RouterList } from '../../router/routerList';

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

type ObjectStateProps = {
    name: string;
    brand: string;
    price: string;
    category: string;
    description: string;
    additionalInfo: string;
    url: string;
    urlText: string;
    altText: string;
    mainImage: string;
    previewImage: string;
}

export default function Object() {
    let { id } = useParams();
    const forceUpdate = useForceUpdate();
	store.on("objects", forceUpdate);
    const navigate = useNavigate();
    if (store.getState().objects && store.getState().objects[id]) {
		const currentObject: ObjectStateProps = store.getState().objects[id]
        const handleNavigateCategory = () => {
            store.set("filter", currentObject.category);
            navigate(RouterList.HOME);
        }

        const isTablet: boolean = window.matchMedia('(max-device-width: 1024px)').matches;
        const isMobile: boolean = window.matchMedia('(max-device-width: 480px)').matches;

        return (
            <>
                <Header logoSize='small' />
                <FiltersTab noSticky={true} buttonBack={true} />
                <section className="object">
                    <img src={currentObject.mainImage} alt={currentObject.altText} className="object__image" draggable="false" />
					<div className="object__card">
						<div className="object__info">
							<div className="object__header">
								<span className="object__name">{currentObject.brand}</span>
								<span className="object__brand">{currentObject.name}</span>
								<span className="object__price">{currentObject.price}₽</span>
							</div>
							<span className="object__description">{currentObject.description}</span>
							<span className="object__additionalinfo">{currentObject.additionalInfo}</span>
						</div>
                        { (!isTablet || isMobile) &&
                            <div className="object__links">
                                <span className="object__url">КУПИТЬ НА САЙТЕ <Anchor href={currentObject.url}>{currentObject.urlText}</Anchor></span>
                                <span className="object__nav">СМОТРЕТЬ ВСЕ ОБЪЕКТЫ ИЗ КАТЕГОРИИ <Button className="object__nav-button" onClick={handleNavigateCategory}>{currentObject.category}</Button></span>
                            </div> 
                        }
					</div>
                </section>
                { isTablet && !isMobile &&
                    <div className="object__links">
                        <span className="object__url">КУПИТЬ НА САЙТЕ <Anchor href={currentObject.url}>{currentObject.urlText}</Anchor></span>
                        <span className="object__nav">СМОТРЕТЬ ВСЕ ОБЪЕКТЫ ИЗ КАТЕГОРИИ <Button className="object__nav-button" onClick={handleNavigateCategory}>{currentObject.category}</Button></span>
                    </div>
                }
                {    
                    isTablet && !isMobile &&
                    <Footer /> 
                }
            </>
        )
    }
    return (
        <>
			<Header logoSize='small' />
			<FiltersTab noSticky={true} buttonBack={true} />
        </>
    )
}
