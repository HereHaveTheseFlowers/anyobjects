import { Link } from 'react-router-dom';
import { RouterList } from '../../router/routerList';

export default function ServerError() {
  return (
    <>
      <h1>500</h1>
      <p>Внутренняя ошибка сервера</p>
      <p>Скоро все поправим</p>
      <Link to={RouterList.HOME}>На главную</Link>
    </>
  );
}
