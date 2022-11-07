import store from '../../utils/Store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

export class ObjectGrid extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        const forceUpdate = this.forceUpdate.bind(this)
        store.on('objects', () => {
            forceUpdate();
        });
        console.log('render')
        let objectArray: Array<{ key: string; value: ObjectProps }> = [];
        if(store.getState().objects && typeof store.getState().objects === 'object') {
            Object.entries(store.getState().objects).forEach(entry => {
                const [key, value] = entry;
                const object = { key: key, value: value as ObjectProps}
                objectArray.push(object);
                console.log(object.value.name)
            })
            objectArray = objectArray.reverse();
            const filteredArray: Array<{ key: string; value: ObjectProps }> = [];
            for(const object of objectArray) {
                if(!store.getState().filter || store.getState().filter === "ВСЁ") {
                    filteredArray.push(object);
                } else {
                    if(object.value && object.value.category === store.getState().filter) {
                        filteredArray.push(object);
                    }
                }
            }
            objectArray = filteredArray;
        }
        
        const filterUpdate = () => {
            const newfilter = store.getState().filter ? store.getState().filter : "ВСЁ"
            const objects = document.querySelectorAll('.object');
            for(const object of objects) {
                const element = object as HTMLElement;
                if(!newfilter || newfilter === "ВСЁ") {
                    element.classList.remove('object_hidden');
                } else if(element.dataset.category && element.dataset.category === newfilter) {
                    element.classList.remove('object_hidden');
                } else {
                    element.classList.add('object_hidden');
                }
            }
        };
        store.on('filter', filterUpdate);

        return (
            <div className='object-grid'>
                {
                    objectArray.map((object) => (
                        <ObjectItem 
                            key={object.key}
                            objectkey={object.key}
                            name={object.value.name}
                            mainImage={object.value.mainImage}
                            previewImage={object.value.previewImage}
                            price={object.value.price}
                            brand={object.value.brand}
                            category={object.value.category}
                        />
                    ))
                }
            </div>
        );
    }
}

type ObjectProps = {
    name: string;
    mainImage: string;
    previewImage: string;
    price: string;
    brand: string;
    objectkey: string;
    category: string;
}

function ObjectItem(props: ObjectProps) {
    const navigate = useNavigate();
    const navigateObject = () => navigate(`${RouterList.OBJECT}/${props.objectkey}`);
    return (
    <div className="object" onClick={navigateObject} data-category={props.category}>
        <div className="object__card">
            <span className="object__brand">{props.brand}</span>
            <span className="object__name">{props.name}</span>
            <span className="object__price">{props.price}₽</span>
        </div>
        <img className="object__image" src={props.previewImage} alt="" draggable="false"/>
    </div>
    )
}
