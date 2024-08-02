import { Button } from '../../components';
import store from '../../utils/Store'
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import FirestoreController from '../../api/firestoreController'

export default function Admin() {
    
    const block = {
        position: "3",
        name: "ЛИМОНАД ура МАНГО+ЧИЛИ",
        brand: "LAPOCHKA",
        price: "199",
        category: "ЕДА",
        description: "Наш любимый лимонад родом из Челябинска. Ручное производство и натуральные ингредиенты. В составе ничего лишнего – только сок и газированная вода.",
        additionalinfo: "Объем: 330 мл",
        url: "https://www.ozon.ru/product/naturalnyy-limonad-lapochka-bez-sahara-lapochka-mango-chili-6h0-33l-563646717/?_bctx=CAQQt90W&asb2=9j6-Ua29Fm7eqdBxsgu3ZI_clBskhODQ5N_hg-ozWOX3llgvxgO9Gdi-dpfav9Rn&avtc=1&avte=2&avts=1666101019&hs=1&miniapp=seller_372407&sh=Ea7d0St1ng",
        urltext: "OZON",
        alttext: "Жестяная банка лимонада с яркой иллюстрацией персика и перца чили. На банке нанесен текст “Mango + Chili, 100% natural lemonade, no sugar, 100% organic, lapochka.”",
    }

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate(RouterList.HOME);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!e.target) return;
        const fd: FormData = new FormData(e.target as HTMLFormElement);
        if(!fd) return;
        const output: Record<string, string> = {};
        for(const data of fd) {
          output[data[0].toString()] = data[1].toString();
        }
        if(!output.login || !output.password) return;
        FirestoreController.Login(output.login, output.password)
        .then((userCredential)=>{
            if(userCredential.user) {
                store.set('auth', 'admin')
                navigate(RouterList.ADMIN_EDIT)
            }
        })
    };

    return (
        <>
            <div className='admin'>
                <Button onClick={navigateHome} className='admin__gohome'>ГО НА ГЛАВНУЮ</Button>
                <form className='admin__form form' onSubmit={onSubmit}>
                    <div className="inputfield">
                        <span className="inputfield__title">ЛОГИН</span>
                        <input name='login' type='text' className='inputfield__input' />
                    </div>
                    <div className="inputfield">
                        <span className="inputfield__title">ПАРОЛЬ</span>
                        <input name='password' type='password' className='inputfield__input' />
                    </div>
                    <Button className='form__button-submit form__button-submit_state_active'>ВОЙТИ</Button>
                </form>
            </div>
        </>
    )
}
