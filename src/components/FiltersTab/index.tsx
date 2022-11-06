import { Button } from './../Button';

export function FiltersTab() {
  return (
    <div className="filters-tab">
        <span className="filters-tab__filters">
            <Button>ВСЁ</Button>
            <Button>ИНТЕРЬЕР</Button>
            <Button>ГИГИЕНА</Button>
            <Button>ОДЕЖДА И АКСЕССУАРЫ</Button>
            <Button>ЕДА</Button>
        </span>
    </div>
  );
}
