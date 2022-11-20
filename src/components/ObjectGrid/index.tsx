import store from '../../utils/Store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { vh, vw } from '../../utils/helpers';
import { fetchObjects, ObjectProps } from '../../api/fetchObjects';
import { Button } from '../../components';
import { FormModal } from '../../components';
import e from 'express';

type ObjectGridProps = { mode?: 'admin' | null }

export class ObjectGrid extends React.Component<ObjectGridProps> {
    constructor(props: ObjectGridProps) {
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
        let objectArray: Array<{ key: string; value: ObjectProps }> = [];
        if(store.getState().objects && typeof store.getState().objects === 'object') {
            Object.entries(store.getState().objects).forEach(entry => {
                const [key, value] = entry;
                const object = { key: key, value: value as ObjectProps}
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
                            mode={this.props.mode}

                            name={object.value.name}
                            price={object.value.price}
                            brand={object.value.brand}
                            category={object.value.category}
                            description={object.value.description}
                            additionalInfo={object.value.additionalInfo}
                            url={object.value.url}
                            urlText={object.value.urlText}
                            altText={object.value.altText}

                            mainImage={object.value.mainImage}
                            previewImage={object.value.previewImage}
                        />
                    ))
                }
            </div>
        );
    }
}

type ObjectCardProps = {
    objectkey: string;
    mode: 'admin' | null;
} & ObjectProps;

function ObjectCard(props: ObjectCardProps) {
    const navigate = useNavigate();
    const navigateObject = () => navigate(`${RouterList.OBJECT}/${props.objectkey}`);
    const objectImageSize =  ((vw(100) - vh(18)) / 3).toFixed(2);
    if(props.mode !== 'admin') {
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
    } else {
        const [isModalActive, setisModalActive] = useState(false);

        const handleOpenDeleteObjectModal = () => {
            setisModalActive(true);
        }

        const handleDeleteObject = (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault()
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function() {
                console.log(this.responseText);
                setTimeout(()=>{
                    fetchObjects();
                }, 3000);
            };
            xmlhttp.open("POST", `${window.location.origin}/${store.getState().phpKey}/deleteobject.php`);
            xmlhttp.send(JSON.stringify({ objectkey: props.objectkey }));
            setisModalActive(false);
        }

        const handleRefreshObject = (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault()
            console.log(`refreshing object number ${props.objectkey}`)
        }

        const checkForImage = (e: React.FocusEvent<HTMLInputElement, Element>) => {
            const InputElement = e.target;
            if(!InputElement) return;
            if(InputElement.type==='file') {
                let inputImage = InputElement.files[0];
                if(inputImage) {
                    InputElement.style.background = 'black'
                } else {
                    InputElement.style.background = 'white'
                }
            }
        }

        return (
        <div className="object-card object-card_mode_admin">
            <form className="object-card__info object-card__info_mode_admin" onSubmit={handleRefreshObject}>
                <div className="object-card__inputfield">
                    НАЗВАНИЕ: 
                    <input name='name' type='text' className="object-card__input" defaultValue={props.name} />
                </div>
                <div className="object-card__inputfield">
                    БРЕНД: 
                    <input name='brand' type='text'  className="object-card__input" defaultValue={props.brand} />
                </div>
                <div className="object-card__inputfield">
                    ЦЕНА: 
                    <input name='price' type='text'  className="object-card__input" defaultValue={props.price} />
                </div>
                <div className="object-card__inputfield">
                    КАТЕГОРИЯ: 
                    <input name='category' type='text'  className="object-card__input" defaultValue={props.category} />
                </div>
                <div className="object-card__inputfield">
                    ОПИСАНИЕ: 
                    <input name='description' type='text'  className="object-card__input" defaultValue={props.description} />
                </div>
                <div className="object-card__inputfield">
                    ДОП. ИНФА: 
                    <input name='additionalInfo' type='text'  className="object-card__input" defaultValue={props.additionalInfo.replaceAll('\n', '[ПЕРЕНОС]')} />
                </div>
                <div className="object-card__inputfield">
                    ССЫЛКА: 
                    <input name='url' type='text'  className="object-card__input" defaultValue={props.url} />
                </div>
                <div className="object-card__inputfield">
                    ТЕКСТ ССЫЛКИ: 
                    <input name='urlText' type='text'  className="object-card__input" defaultValue={props.urlText} />
                </div>
                <div className="object-card__inputfield">
                    АЛЬТ. ТЕКСТ: 
                    <input name='altText' type='text'  className="object-card__input" defaultValue={props.altText} />
                </div>
                <div className="object-card__inputfield" title="544x544">
                    КАРТИНКА (БОЛЬШАЯ): 
                    <input name='mainImage' type='file'  className="object-card__input" onChange={checkForImage} />
                </div>
                <div className="object-card__inputfield" title="432x432">
                    КАРТИНКА (ПРЕВЬЮ): 
                    <input name='previewImage' type='file'  className="object-card__input" onChange={checkForImage} />
                </div>
                <Button className='object-card__button-submit'>ОБНОВИТЬ ОБЪЕКТ</Button>
                
                <button className='form__button-close' type='button' onClick={handleOpenDeleteObjectModal} aria-label="Удалить объект">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 13.63 5.63 8 0 2.37 2.37 0 8 5.63 13.63 0l2.34 2.37-5.6 5.6L16 13.63 13.63 16 8 10.34l-5.63 5.63Z"/></svg>
                </button>
            </form>
            <img className="object-card__image object-card__image_mode_admin" src={props.previewImage} alt={props.altText} draggable="false" width={objectImageSize} height={objectImageSize} />
            
            <FormModal active={isModalActive} setActive={setisModalActive} onSubmit={handleDeleteObject}>
                УВЕРЕНЫ, ЧТО ХОТИТЕ УДАЛИТЬ ОБЪЕКТ?
                <Button className='object-card__button-submit'>ДА</Button>
            </FormModal>
        </div>
        )
    };
}
