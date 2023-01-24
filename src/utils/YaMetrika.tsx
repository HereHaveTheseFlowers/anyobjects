import React, {FC} from 'react';
import {YMInitializer} from 'react-yandex-metrika';

const YaMetrika: FC = () => {
  return (
    <YMInitializer
      options={{webvisor: true}}
      accounts={[91685828]}
      version={"2"}
    />
  );
};

export default YaMetrika;