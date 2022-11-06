import React from 'react';
import { Footer, Header, Button, FiltersTab } from '../../components';

export default function Home() {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState((prevState: undefined) => undefined), []);
    console.log("render");

    const fetchObjects = () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                if(data) {
                    for(const objectpath of data.objectsList) {
                        const request = new XMLHttpRequest();
                        request.open("GET", `${window.location.href}objects/${objectpath}/objectInfo.json`, true);
                        request.overrideMimeType("application/json");
                        request.send();
                        request.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                const jsonData = JSON.parse(request.responseText);
                                jsonData['mainImage'] = `${window.location.href}objects/${objectpath}/main.png`
                                jsonData['previewImage'] = `${window.location.href}objects/${objectpath}/preview.png`
                                console.log(jsonData);
                            }
                        }
                    }
                }
            }
        };
        xhr.open("GET", '/objects/objectsList.json', true);
        xhr.setRequestHeader("Cache-Control", "max-age=0");
        xhr.send();
    }
    fetchObjects();

    return (
        <>
            <Header logoSize={'big'} />
            <h1 className='home__h1'>
                ∀ НУ — КУРАТОРСКИЙ ПРОЕКТ ПРО РОССИЙСКОЕ ПРОИЗВОДСТВО. МЫ СОЗДАЛИ АРХИВ ОБЪЕКТОВ, КОТОРЫЕ МЫ НАШЛИ КРАСИВЫМИ.
            </h1>
            <FiltersTab />
            <div className="home__object-grid">
                
            </div>
            <Footer />
        </>
    )
}
