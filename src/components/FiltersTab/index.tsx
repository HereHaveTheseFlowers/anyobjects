import { Button } from './../Button';
import store from '../../utils/Store';
import { useNavigate } from 'react-router-dom';
import { RouterList } from '../../router/routerList';
import { useEffect } from 'react';

type FiltersTabProps = { noSticky?: boolean | string; }

export function FiltersTab(props: FiltersTabProps) {
  let stickyClass = '';
  if(!props.noSticky) {
    stickyClass = ' filters-tab_position_sticky';
  }
  const navigate = useNavigate();
  console.log('render')
  useEffect(() => {
    UpdateFiltersState();
  });

  const applyFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(window.location.pathname !== '/') {
      navigate(RouterList.HOME);
    }
    const element = event.target as HTMLButtonElement;
    store.set("filter", element.textContent);
    UpdateFiltersState();
  };
  return (
    <div className={`filters-tab${stickyClass}`}>
        <span className="filters-tab__filters">
            <Button onClick={applyFilter} className='filters-tab__filter'>ВСЁ</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ИНТЕРЬЕР</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ГИГИЕНА</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ОДЕЖДА И АКСЕССУАРЫ</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ЕДА</Button>
        </span>
    </div>
  );
}

function UpdateFiltersState() {
  console.log('FILTER IS NOW:' + store.getState().filter)
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
