import store from '../../utils/Store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

export function ObjectGrid() {
    const [objects, setObjects] = React.useState(store.getState().objects);
    let objectArray: Array<{ key: string; value: ObjectProps }> = [];
    Object.entries(store.getState().objects).forEach(entry => {
        const [key, value] = entry;
        const object = { key: key, value: value as ObjectProps}
        objectArray.push(object);
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
    const objectsUpdate = () => {
        setObjects(store.getState().objects);
    };
    store.on('objects', objectsUpdate);


    const [filter, setFilter] = React.useState("ВСЁ");
    const filterUpdate = () => {
        const newfilter = store.getState().filter ? store.getState().filter : "ВСЁ"
        setFilter(newfilter);
    };
    store.on('filter', filterUpdate);

    return (
        <div className='object-grid'>
            {
                objectArray.map((object) => (
                    <ObjectGrid.Object 
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

type ObjectProps = {
    name: string;
    mainImage: string;
    previewImage: string;
    price: string;
    brand: string;
    objectkey: string;
    category: string;
}

ObjectGrid.Object = function ObjectGridObject(props: ObjectProps) {
    const navigate = useNavigate();
    const navigateObject = () => navigate(`${RouterList.OBJECT}/${props.objectkey}`);
    return (
    <div className="object" onClick={navigateObject}>
        <div className="object__card">
            <span className="object__brand">{props.brand}</span>
            <span className="object__name">{props.name}</span>
            <span className="object__price">{props.price}₽</span>
        </div>
        <img className="object__image" src={props.previewImage} alt="" draggable="false"/>
    </div>
    )
};

