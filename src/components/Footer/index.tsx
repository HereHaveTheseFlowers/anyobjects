import classnames from 'classnames';
import React from 'react';
import { Button, Anchor } from '..';


export function Footer() {
  return (
    <footer className="footer">
        <span>∀ НУ, 2022</span>
        <span>ДИЗАЙН КОНЦЕПЦИЯ: <Anchor href={'http://normcultura.agency'}>НОРМ КУЛЬТУРА</Anchor></span>
        <span>РАЗРАБОТКА: <Anchor href={'https://github.com/HereHaveTheseFlowers'}>РИЧАРД</Anchor></span>
    </footer>
  );
}
