import store from '../utils/Store';

export const fetchObjects = () => {
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
