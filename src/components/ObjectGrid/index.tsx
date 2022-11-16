import store from '../../utils/Store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { vh, vw } from '../../utils/helpers';

export class ObjectGrid extends React.Component {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        this.filterUpdate();
    }
    filterUpdate() {
        const newfilter = store.getState().filter ? store.getState().filter : "ВСЁ"
        const objects = document.querySelectorAll('.object-card');
        for(const object of objects) {
            const element = object as HTMLElement;
            if(!newfilter || newfilter === "ВСЁ") {
                element.classList.remove('object-card_hidden');
            } else if(element.dataset.category && element.dataset.category === newfilter) {
                element.classList.remove('object-card_hidden');
            } else {
                element.classList.add('object-card_hidden');
            }
        }
    }
    render() {
        const forceUpdate = this.forceUpdate.bind(this)
        store.on('objects', () => {
            forceUpdate();
        });
        let objectArray: Array<{ key: string; value: ObjectCardProps }> = [];
        if(store.getState().objects && typeof store.getState().objects === 'object') {
            Object.entries(store.getState().objects).forEach(entry => {
                const [key, value] = entry;
                const object = { key: key, value: value as ObjectCardProps}
                objectArray.push(object);
            })
            objectArray = objectArray.reverse();
        }
        
        store.on('filter', this.filterUpdate);

        return (
            <div className='object-grid'>
                {
                    objectArray.map((object) => (
                        <ObjectCard 
                            key={object.key}
                            objectkey={object.key}
                            name={object.value.name}
                            mainImage={object.value.mainImage}
                            previewImage={object.value.previewImage}
                            price={object.value.price}
                            brand={object.value.brand}
                            category={object.value.category}
                            altText={object.value.altText}
                        />
                    ))
                }
            </div>
        );
    }
}

type ObjectCardProps = {
    name: string;
    brand: string;
    price: string;
    category: string;
    mainImage: string;
    previewImage: string;
    objectkey: string;
    altText: string;
}

function ObjectCard(props: ObjectCardProps) {
    const navigate = useNavigate();
    const navigateObject = () => navigate(`${RouterList.OBJECT}/${props.objectkey}`);
    const objectImageSize =  ((vw(100) - vh(18)) / 3).toFixed(2);
    return (
    <div className="object-card" onClick={navigateObject} data-category={props.category}>
        <div className="object-card__info">
            <span className="object-card__brand">{props.brand}</span>
            <span className="object-card__name">{props.name}</span>
            <span className="object-card__price">{props.price}₽</span>
        </div>
        <img className="object-card__image" src={props.previewImage} alt={props.altText} draggable="false" width={objectImageSize} height={objectImageSize} />
    </div>
    )
}
