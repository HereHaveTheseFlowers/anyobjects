import { useNavigate } from 'react-router-dom';
import { Header, FiltersTab, Button } from '../../components';
import { RouterList } from '../../router/routerList';


export default function ServerError() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(RouterList.HOME);
  };

  const handleRefresh = () => {
    navigate(-1);
    window.location.reload();
  };

  return (
    <>
      <Header logoSize='small' />
      <FiltersTab noSticky={true} buttonBack={true} />
      <div className="error">        
        <svg xmlns="http://www.w3.org/2000/svg" className="error__title" viewBox="0 0 880 319.91"><path d="M232.22 55.76H71.78l-7.31 76.77a112.43 112.43 0 0 1 32.91-12.8 157.72 157.72 0 0 1 37.48-4.56q54.4 0 85.03 25.13 31.1 25.14 31.09 74.5 0 47.52-32.46 76.31-32 28.8-90.51 28.8-56.7 0-88.23-21.94Q8.68 275.57 0 235.82l54.4-10.51q5.49 22.4 23.77 33.81 18.75 11.43 48.91 11.43 35.2 0 51.2-14.62 16.45-14.63 16.46-40.68 0-25.13-17.83-39.3-17.37-14.18-50.28-14.17a113.81 113.81 0 0 0-34.29 5.03 94.15 94.15 0 0 0-29.26 14.62l-51.65-15.08L26.97 4.57h205.25ZM429.08 319.9q-67.2 0-101.03-40.67t-33.83-119.28q0-77.24 33.83-118.36Q361.87-.01 429.08 0q67.65 0 101.03 41.59 33.83 41.13 33.82 118.36 0 78.6-33.82 119.28-33.38 40.68-101.03 40.68Zm0-50.26q39.3 0 58.06-26.97 19.2-27.42 19.2-82.72 0-55.76-19.2-82.72-18.75-26.96-58.06-26.96-38.85 0-58.06 26.96-19.2 26.97-19.2 82.72 0 55.3 19.2 82.72 19.2 26.97 58.06 26.97Zm316.06 50.26q-67.2 0-101.02-40.67-33.83-40.67-33.83-119.28 0-77.24 33.83-118.36Q677.95-.01 745.14 0q67.65 0 101.03 41.59Q879.99 82.7 880 159.95q0 78.6-33.83 119.28-33.38 40.68-101.02 40.68Zm0-50.26q39.31 0 58.06-26.97 19.2-27.42 19.2-82.72 0-55.76-19.2-82.72-18.75-26.96-58.06-26.96-38.85 0-58.05 26.96-19.2 26.97-19.2 82.72 0 55.3 19.2 82.72 19.2 26.97 58.05 26.97Z"/></svg>
        <div className="error__description">
          ВНУТРЕННЯЯ ПРОБЛЕМА СЕРВЕРА.<br />
          ПОПРОБУЙ <Button className="error__button" onClick={handleRefresh}>ОБНОВИТЬ</Button> СТРАНИЦУ ЧЕРЕЗ КАКОЕ-ТО ВРЕМЯ.<br />
          ИЛИ ГО НА <Button className="error__button" onClick={handleGoHome}>ГЛАВНУЮ СТРАНИЦУ.</Button>
        </div>
      </div>
    </>
  );
}
