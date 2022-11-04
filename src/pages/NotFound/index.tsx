import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>404</h1>
      <p>Ошибка</p>
      <p>К сожалению, запрашиваемая страница не найдена</p>
      <button onClick={handleGoBack}>Назад</button>
    </>
  );
}
