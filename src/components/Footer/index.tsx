import { useEffect } from 'react';
import checkFlexGap from '../../utils/checkFlexGap';
import { Anchor } from './../Anchor';

export function Footer() {
  useEffect(() => {
    if(!checkFlexGap()) {
      document.querySelector('.filters-tab__filters')?.classList.add("no-flexbox-gap")
      document.querySelector('.filters-tab')?.classList.add("no-flexbox-gap")
    } 
  });
  return (
    <footer className="footer">
        <span><span className="∀-fix">∀</span> НУ, 2022</span>
        <span>ДИЗАЙН КОНЦЕПЦИЯ: <Anchor href={'http://normcultura.agency'}>НОРМ КУЛЬТУРА</Anchor></span>
        <span>РАЗРАБОТКА: <Anchor href={'https://github.com/HereHaveTheseFlowers'}>ВОТ ВОЗЬМИ ЦВЕТЫ</Anchor></span>
    </footer>
  );
}
