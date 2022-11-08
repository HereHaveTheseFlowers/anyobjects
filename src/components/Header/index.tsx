import React from 'react';
import { Button } from './../Button';
import { Anchor } from './../Anchor';
import bigLogo from '../../assets/svg/logo-big.svg';
import smallLogo from '../../assets/svg/logo-small.svg';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

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
    return (
    <header className="header">
        <div className="header__menu header__menu_left">
            <Button onClick={navigateAbout} className={buttonAboutClass}>О НАС</Button>
            <Anchor className="header__menu-anchor" href="https://www.instagram.com/normcultura/">ИНСТАГРАМ</Anchor>
        </div>
        <img src={logoSize === 'big' ? bigLogo : smallLogo} className={`header__logo_${logoSize}`} alt='Логотип а ну' draggable='false' />
        <div className="header__menu header__menu_right">
            <Button>ПРЕДЛОЖИТЬ ОБЪЕКТ</Button>
        </div>
    </header>
    );
}
