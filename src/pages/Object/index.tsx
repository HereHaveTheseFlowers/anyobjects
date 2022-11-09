import { useParams } from 'react-router-dom';
import { Header, FiltersTab, Anchor, Button } from '../../components';
import store from '../../utils/Store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RouterList } from '../../router/routerList';

function useForceUpdate(){
    console.log(store.getState().objects)
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

type ObjectProps = {
    name: string;
    brand: string;
    price: string;
    category: string;
    description: string;
    additionalInfo: string;
    url: string;
    urlText: string;
    mainImage: string;
    previewImage: string;
}

export default function Object() {
    let { id } = useParams();
    const forceUpdate = useForceUpdate();
	store.on("objects", forceUpdate);
    const navigate = useNavigate();
    if (store.getState().objects && store.getState().objects[id]) {
		const currentObject: ObjectProps = store.getState().objects[id]
        const handleNavigateCategory = () => {
            store.set("filter", currentObject.category);
            navigate(RouterList.HOME);
        }
        return (
            <>
                <Header logoSize='small' />
                <FiltersTab noSticky={true} />
                <section className="object">
                    <img src={currentObject.mainImage} alt="" className="object__image" draggable="false" />
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
						<div className="object__links">
							<span className="object__url">КУПИТЬ НА САЙТЕ <Anchor href={currentObject.url}>{currentObject.urlText}</Anchor></span>
							<span className="object__nav">СМОТРЕТЬ ВСЕ ОБЪЕКТЫ ИЗ КАТЕГОРИИ <Button className="object__nav-button" onClick={handleNavigateCategory}>{currentObject.category}</Button></span>
						</div>
					</div>
                </section>
            </>
        )
    }
    return (
        <>
			<Header logoSize='small' />
			<FiltersTab noSticky={true} />
        </>
    )
}
