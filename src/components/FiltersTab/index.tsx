import { Button } from './../Button';
import store from '../../utils/Store';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { useEffect } from 'react';

type FiltersTabProps = {
  noSticky?: boolean | string;
  buttonBack?: boolean;
}

export function FiltersTab(props: FiltersTabProps) {

  let stickyClass = '';
  if(!props.noSticky) {
    stickyClass = ' filters-tab_position_sticky';
  }
  const navigate = useNavigate();
  useEffect(() => {
    UpdateFiltersState();
  });
  const handleGoBack = () => {
    navigate(-1);
  };

  let buttonBack = null;
  if(props.buttonBack) {
    buttonBack = (
      <button className="filters-tab__back-button" onClick={handleGoBack} aria-label="Иконка стрелочки назад">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20">
          <path d="m.96 10 7.19-7.19L9.7 4.37 5.29 8.8h23.75v2.4H5.29l4.41 4.39-1.57 1.6L.96 10Z"/>
        </svg>
      </button>
    )
  }

  const applyFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(window.location.pathname !== '/') {
      navigate(RouterList.HOME);
    }
    const element = event.target as HTMLButtonElement;
    store.set("filter", element.textContent.replaceAll("\xa0", " "));
    UpdateFiltersState();
  };

  const isMobile: boolean = window.matchMedia('(max-device-width: 480px)').matches;

  return (
    <div className={`filters-tab${stickyClass}`}>
        { !isMobile && buttonBack }
        <span className="filters-tab__filters">
            <Button onClick={applyFilter} className='filters-tab__filter'>ВСЁ</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ИНТЕРЬЕР</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ГИГИЕНА</Button>
            { !isMobile && 
              <>
                <Button onClick={applyFilter} className='filters-tab__filter'>ОДЕЖДА&nbsp;И&nbsp;АКСЕССУАРЫ</Button>
                <Button onClick={applyFilter} className='filters-tab__filter'>ЕДА</Button>
              </>
            }
        </span>
        { isMobile && 
          <span className="filters-tab__filters">
              <Button onClick={applyFilter} className='filters-tab__filter'>ОДЕЖДА&nbsp;И&nbsp;АКСЕССУАРЫ</Button>
              <Button onClick={applyFilter} className='filters-tab__filter'>ЕДА</Button>
          </span>
        }
    </div>
  );
}

function UpdateFiltersState() {
  //console.log('FILTER IS NOW:' + store.getState().filter)
  if(window.location.pathname === '/about') return;
  const buttons = document.querySelectorAll('.filters-tab__filter')
  for(const button of buttons) {
    if(!store.getState().filter && button.textContent === 'ВСЁ') {
      button.classList.add('button_state_chosen')
    }
    else if(button.textContent === store.getState().filter) {
      button.classList.add('button_state_chosen')
    }
    else {
      button.classList.remove('button_state_chosen')
    }
  }
}
