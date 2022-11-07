import React from 'react';
import { Button } from './../Button';
import bigLogo from '../../assets/svg/logo-big.svg';
import smallLogo from '../../assets/svg/logo-small.svg';

type HeaderProps = { 
    logoSize: 'small' | 'big';
}

export function Header(props: HeaderProps) {
    const { logoSize } = props;
    return (
    <header className="header">
        <div className="header__menu header__menu_left">
            <Button>О НАС</Button>
            <Button>ИНСТАГРАМ</Button>
        </div>
        <img src={logoSize === 'big' ? bigLogo : smallLogo} className={`header__logo_${logoSize}`} />
        <div className="header__menu header__menu_right">
            <Button>ПРЕДЛОЖИТЬ ОБЪЕКТ</Button>
        </div>
    </header>
    );
}
