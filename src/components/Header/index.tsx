import { Button } from './../Button';
import { Anchor } from './../Anchor';
import { FormModal } from './../FormModal';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { useState } from 'react';
import { validateForm, validateInput } from '../../utils/validate';
import { debounce } from '../../utils/helpers';

type HeaderProps = { 
    logoSize: 'small' | 'big';
}

export function Header(props: HeaderProps) {
    const { logoSize } = props;
    let buttonAboutClass = '';
    if(window.location.pathname === '/about') {
        buttonAboutClass = 'button_state_chosen';
    }
    const navigate = useNavigate();
    const navigateAbout = () => navigate(RouterList.ABOUT);
    const navigateHome = () => navigate(RouterList.HOME);
    const handleGoHome = () => {
        if(window.location.pathname === '/') {
            window.location.reload();
        } else {
            navigateHome();
        }
    };

    const [isModalActive, setisModalActive] = useState(false);

    const handleOpenForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(e.ctrlKey) { navigate(RouterList.ADMIN) }
        else { setisModalActive(true) }
    };

    const handleSendEmail: any = debounce((fd: FormData) => {
        console.log('Sending emails isnt supproted yet. But heres the data:');
        console.log(fd);
    }, 2000)

    const handleSuggestObject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!e.target) return;
        const fd = new FormData(e.target as HTMLFormElement);
        if(fd && validateForm(fd)) {
            if(handleSendEmail(fd)) {
                const buttonSubmit = document.querySelector('.form__button-submit');
                if(buttonSubmit) {
                    buttonSubmit.classList.remove('form__button-submit_state_active');
                    setTimeout(()=>{
                        if(!e.target) return;
                        const newfd = new FormData(e.target as HTMLFormElement);
                        if(validateForm(newfd)) buttonSubmit.classList.add('form__button-submit_state_active');
                    }, 2000);
                }
            };
        }
    };

    return (
    <header className="header">
        <div className="header__menu header__menu_left">
            <Button onClick={navigateAbout} className={buttonAboutClass}>О НАС</Button>
            <Anchor className="header__menu-anchor" href="https://www.instagram.com/normcultura/">ИНСТАГРАМ</Anchor>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 217" className={`header__logo header__logo_${logoSize}`} onClick={handleGoHome} >
            <path d="M82.0521 213.944 0 0h30.0041l20.5131 53.1803h90.6248L161.655 0h365.873v91.3845h113.893V0h76.924l71.642 136.007L850.608 0H880l-78.072 172.072a152.8521 152.8521 0 0 1-10.716 20.172 59.57516 59.57516 0 0 1-12.247 14.059 42.24121 42.24121 0 0 1-15.308 7.946A65.21642 65.21642 0 0 1 743.756 217q-3.36749 0-6.735-.306a44.987 44.987 0 0 1-5.511-.305v-25.674q2.4495.306 5.511.612h6.735a57.16618 57.16618 0 0 0 11.022-.917 20.90837 20.90837 0 0 0 7.96-3.973 28.16126 28.16126 0 0 0 6.43005-7.947 124.86085 124.86085 0 0 0 6.42895-12.836L700.281 24.6479H670.2V213.944h-28.779v-97.498H527.528v97.498h-28.78V26.6197H182.675L110.832 213.944Zm13.7774-36.676 35.8215-99.0258H60.0083Z" />
        </svg>
        <div className="header__menu header__menu_right">
            <Button onClick={handleOpenForm}>ПРЕДЛОЖИТЬ ОБЪЕКТ</Button>
        </div>
        <FormModal active={isModalActive} setActive={setisModalActive} onSubmit={handleSuggestObject}>
            <FormModal.InputField fieldtitle='НАЗВАНИЕ' name='objectname' type='text' autoComplete="off" />
            <FormModal.InputField fieldtitle='БРЕНД' name='objectbrand' type='text' autoComplete="off" />
            <FormModal.InputField fieldtitle='ССЫЛКА НА ОБЪЕКТ' name='objecturl' type='text' autoComplete="off" />
            <FormModal.ButtonSubmit>ПРЕДЛОЖИТЬ ОБЪЕКТ</FormModal.ButtonSubmit>
        </FormModal>
    </header>
    );
}
