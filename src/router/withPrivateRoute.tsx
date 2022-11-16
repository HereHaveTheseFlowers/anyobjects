import store from '../utils/Store';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RouterList } from './routerList';

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export function withPrivateRoute(children: JSX.Element) {
    const forceUpdate = useForceUpdate();
    const isAuth = store.getState().auth;
    store.on('auth', forceUpdate);


    return isAuth ? children : <Navigate to={'/'+RouterList.ADMIN} replace />;
}
