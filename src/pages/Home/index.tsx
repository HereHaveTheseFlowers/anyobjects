import React from 'react';
import { Footer, Header, Button, FiltersTab, ObjectGrid } from '../../components';
import store from '../../utils/Store';

export default function Home() {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState((prevState: undefined) => undefined), []);
    store.on('objects', forceUpdate);

    return (
        <>
            <Header logoSize={'big'} />
            <h1 className='home__h1'>
                ∀ НУ — КУРАТОРСКИЙ ПРОЕКТ ПРО РОССИЙСКОЕ ПРОИЗВОДСТВО. МЫ СОЗДАЛИ АРХИВ ОБЪЕКТОВ, КОТОРЫЕ МЫ НАШЛИ КРАСИВЫМИ.
            </h1>
            <FiltersTab />
            <ObjectGrid />
            <Footer />
        </>
    )
}
