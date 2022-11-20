import store from '../utils/Store';

export type ObjectProps = {
    name: string;
    brand: string;
    price: string;
    category: string;
    description: string;
    additionalInfo: string;
    url: string;
    urlText: string;
    altText: string;
    mainImage?: string;
    previewImage?: string;
}

export const fetchObjects = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            if(data) {
                for(const objectpath of data.objectsList) {
                    const request = new XMLHttpRequest();
                    request.open("GET", `${window.location.origin}/objects/${objectpath}/objectInfo.json`, true);
                    request.overrideMimeType("application/json");
                    request.send();
                    request.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            const jsonData: ObjectProps = JSON.parse(request.responseText);
                            jsonData['mainImage'] = `${window.location.origin}/objects/${objectpath}/main.png`
                            jsonData['previewImage'] = `${window.location.origin}/objects/${objectpath}/preview.png`
                            store.set(`objects.${objectpath}`, jsonData)
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
