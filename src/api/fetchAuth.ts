import store from '../utils/Store';

export const fetchAuth = (login: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const params = {
            login: login,
            password: password
        }
        const xhr = new XMLHttpRequest();
        const url = 'https://drab-gray-caiman-hose.cyclic.app/auth';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status < 400) {
                    resolve({ response: xhr.response, status: xhr.status });
                } else {
                    reject({ response: xhr.response, status: xhr.status });
                }
            }
        };
        xhr.onabort = () => reject({reason: 'abort'});
        xhr.onerror = () => reject({reason: 'network error'});
        xhr.ontimeout = () => reject({reason: 'timeout'});
        xhr.responseType = 'json';

        xhr.send(JSON.stringify(params)) // Make sure to stringify
    });
}
