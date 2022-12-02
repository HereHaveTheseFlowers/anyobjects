import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, FiltersTab, Button } from '../../components';
import { RouterList } from '../../router/routerList';


export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(RouterList.HOME);
  };

  const isTablet: boolean = window.matchMedia('(max-device-width: 1024px)').matches;

  return (
    <>
      <Header logoSize='small' />
      <FiltersTab noSticky={true} buttonBack={true} />
      <div className="error">
        <svg xmlns="http://www.w3.org/2000/svg" className="error__title" viewBox="0 0 880 319"><path d="M224.7 314.44h-52.3V246.1H0v-60.61L145.56 4.56h79.14v193.22h41.85v48.3H224.7ZM49.58 197.78H172.4V47.85ZM439.96 319q-66.87 0-100.53-40.56T305.77 159.5q0-77.01 33.66-118.03Q373.09-.01 439.96 0q67.32 0 100.53 41.47 33.65 41.01 33.65 118.03 0 78.38-33.65 118.94Q507.28 319 439.96 319Zm0-50.13q39.12 0 57.77-26.89 19.1-27.33 19.1-82.48 0-55.59-19.1-82.48-18.66-26.9-57.77-26.9-38.67 0-57.77 26.9-19.11 26.88-19.1 82.48 0 55.14 19.1 82.48 19.11 26.9 57.77 26.9Zm398.19 45.57h-52.3V246.1h-172.4v-60.61L759 4.56h79.15v193.22H880v48.3h-41.85ZM663.03 197.78h122.81V47.85Z" /></svg>
        <div className="error__description">СТРАНИЦА НЕ НАЙДЕНА. { isTablet && <br /> }ГО НА <Button className="error__button" onClick={handleGoHome}>ГЛАВНУЮ СТРАНИЦУ.</Button></div>
      </div>
    </>
  );
}
