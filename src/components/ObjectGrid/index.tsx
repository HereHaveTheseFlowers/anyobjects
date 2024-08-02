import store from '../../utils/Store';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { vh, vw } from '../../utils/helpers';
import { ObjectProps } from '../../api/firestoreController';
import { Button } from '../../components';
import { FormModal } from '../../components';
import { validateForm } from '../../utils/validate';
import FirestoreController from '../../api/firestoreController'

type ObjectGridProps = { mode?: 'admin' | null }

export class ObjectGrid extends React.Component<ObjectGridProps> {
    constructor(props: ObjectGridProps) {
        super(props)
    }
    componentDidMount() {
        this.filterUpdate();
        store.on('filter', this.filterUpdate);
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
                            additionalinfo={object.value.additionalinfo}
                            url={object.value.url}
                            urltext={object.value.urltext}
                            alttext={object.value.alttext}
                            position={object.value.position}

                            mainimage={object.value.mainimage}
                            previewimage={object.value.previewimage}
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

    const cardInfoRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);

    const category = props.category;

    const handleImageLoaded = () => {
        if(cardInfoRef && cardInfoRef.current) {
            cardInfoRef.current.classList.add('object-card__info_fadeout');
            setTimeout(() => {
                setImageLoading(false);
            }, 100);
        } else {
            setImageLoading(false);
        }
    };

    const objectImageSize =  ((vw(100) - vh(18)) / 3).toFixed(2);

    if(props.mode !== 'admin') {
        if(!props.previewimage || imageLoading) {
            return (
                <div className="object-card" data-category={category}>
                    <img className="object-card__image image_visibility_hidden" onLoad={() => {
						handleImageLoaded();
					}} src={props.previewimage} alt={props.alttext} draggable="false" width={objectImageSize} height={objectImageSize} />
                    <div className="skeleton-image"></div>
                    <div className="object-card__info" ref={cardInfoRef}>
                        <span className="object-card__brand skeleton-box" style={{width: '20%'}} />
                        <span className="object-card__name skeleton-box" style={{width: '40%'}} />
                        <span className="object-card__price skeleton-box" style={{width: '20%'}} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="object-card" onClick={navigateObject} data-category={category}>
                    <img className="object-card__image object-card__image_loaded" src={props.previewimage} alt={props.alttext} draggable="false" width={objectImageSize} height={objectImageSize} />
                    <div className="object-card__info">
                        <span className="object-card__brand">{props.brand}</span>
                        <span className="object-card__name">{props.name}</span>
                        <span className="object-card__price">{props.price}₽</span>
                    </div>
                </div>
            )
        }
    } else if(props) {
        return <ObjectCardAdmin {...props} />
    }
}

function ObjectCardAdmin(props: ObjectCardProps) {
    const objectImageSize =  ((vw(100) - vh(18)) / 3).toFixed(2);
    const [isModalActive, setisModalActive] = useState(false);
    const navigate = useNavigate();

    const handleOpenDeleteObjectModal = () => {
        setisModalActive(true);
    }

    const handleDeleteObject = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        FirestoreController.deleteObject(props.position)
        setisModalActive(false);
    }

    const handleRefreshObject = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if(!e.target) return;
        const fd = new FormData(e.target as HTMLFormElement);
        if(fd && validateForm(fd)) {
            const newObject: any = {
                position: '',
                name: '',
                brand: '',
                price: '',
                category: '',
                description: '',
                additionalinfo: '',
                url: '',
                urltext: '',
                alttext: ''
            }
            for (const pair of fd.entries()) {
                if(typeof pair[1] === 'string') {
                    fd.set(pair[0], pair[1].replaceAll('[ПЕРЕНОС]', '\n'))
                    newObject[pair[0].replace('object', '')] =  pair[1]
                } 
            }
            for (const pair of fd.entries() as any) {
                if(pair[0] === 'objectmainimage' && pair[1] && pair[1].name) {
                    FirestoreController.writeImage(pair[1] as File, `/images/mainimage${newObject.position}`)
                } else if(pair[0] === 'objectpreviewimage' && pair[1] && pair[1].name) {
                    FirestoreController.writeImage(pair[1] as File, `/images/previewimage${newObject.position}`)
                }
            }
            FirestoreController.writeObject(newObject)
            setisModalActive(false);
        }
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
                ПОРЯДКОВЫЙ НОМЕР: 
                <input name='objectposition' type='text' className="object-card__input" defaultValue={props.position} />
            </div>
            <div className="object-card__inputfield">
                НАЗВАНИЕ: 
                <input name='objectname' type='text' className="object-card__input" defaultValue={props.name} />
            </div>
            <div className="object-card__inputfield">
                БРЕНД: 
                <input name='objectbrand' type='text'  className="object-card__input" defaultValue={props.brand} />
            </div>
            <div className="object-card__inputfield">
                ЦЕНА: 
                <input name='objectprice' type='text'  className="object-card__input" defaultValue={props.price} />
            </div>
            <div className="object-card__inputfield">
                КАТЕГОРИЯ: 
                <input name='objectcategory' type='text'  className="object-card__input" defaultValue={props.category} />
            </div>
            <div className="object-card__inputfield">
                ОПИСАНИЕ: 
                <input name='objectdescription' type='text'  className="object-card__input" defaultValue={props.description} />
            </div>
            <div className="object-card__inputfield">
                ДОП. ИНФА: 
                <input name='objectadditionalinfo' type='text'  className="object-card__input" defaultValue={props.additionalinfo.replaceAll('\n', '[ПЕРЕНОС]')} />
            </div>
            <div className="object-card__inputfield">
                ССЫЛКА: 
                <input name='objecturl' type='text'  className="object-card__input" defaultValue={props.url} />
            </div>
            <div className="object-card__inputfield">
                ТЕКСТ ССЫЛКИ: 
                <input name='objecturltext' type='text'  className="object-card__input" defaultValue={props.urltext} />
            </div>
            <div className="object-card__inputfield">
                АЛЬТ. ТЕКСТ: 
                <input name='objectalttext' type='text'  className="object-card__input" defaultValue={props.alttext} />
            </div>
            <div className="object-card__inputfield" title="544x544">
                КАРТИНКА (main.png): 
                <input name='objectmainimage' type='file'  className="object-card__input" onChange={checkForImage} />
            </div>
            <div className="object-card__inputfield" title="432x432">
                КАРТИНКА (preview.png): 
                <input name='objectpreviewimage' type='file'  className="object-card__input" onChange={checkForImage} />
            </div>
            <Button className='object-card__button-submit'>ОБНОВИТЬ ОБЪЕКТ</Button>
            
            <button className='form__button-close' type='button' onClick={handleOpenDeleteObjectModal} aria-label="Удалить объект">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 13.63 5.63 8 0 2.37 2.37 0 8 5.63 13.63 0l2.34 2.37-5.6 5.6L16 13.63 13.63 16 8 10.34l-5.63 5.63Z"/></svg>
            </button>
        </form>
        <img className="object-card__image object-card__image_mode_admin" src={props.previewimage} alt={props.alttext} draggable="false" width={objectImageSize} height={objectImageSize} />
        
        <FormModal active={isModalActive} setActive={setisModalActive} onSubmit={handleDeleteObject}>
            УВЕРЕНЫ, ЧТО ХОТИТЕ УДАЛИТЬ ОБЪЕКТ?
            <Button className='object-card__button-submit'>ДА</Button>
        </FormModal>
    </div>
    )
}