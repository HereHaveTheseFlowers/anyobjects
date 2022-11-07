import { Button } from './../Button';
import store from '../../utils/Store';

export function FiltersTab() {
  const applyFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const element = event.target as HTMLButtonElement;
    store.set("filter", element.textContent);
    const buttons = document.querySelectorAll('.filters-tab__filter')
    for(const button of buttons) {
      if(button.textContent === store.getState().filter) {
        button.classList.add('button_state_chosen')
      }
      else {
        button.classList.remove('button_state_chosen')
      }
    }
  };
  return (
    <div className="filters-tab">
        <span className="filters-tab__filters">
            <Button onClick={applyFilter} className='filters-tab__filter button_state_chosen'>ВСЁ</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ИНТЕРЬЕР</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ГИГИЕНА</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ОДЕЖДА И АКСЕССУАРЫ</Button>
            <Button onClick={applyFilter} className='filters-tab__filter'>ЕДА</Button>
        </span>
    </div>
  );
}
