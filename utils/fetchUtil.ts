export class fetchUtil {
    /**
        * 这是一个给fetch准备的response处理函数
        * @param {*} resp 
    */
    responseHandler(resp: Response) {
        if (resp.ok) {
            if (resp.headers.get('Content-Type') == 'text/html') return resp.text();
            if (resp.headers.get('Content-Type') == 'application/json') return resp.json();
            if (resp.headers.get('Content-Type') == 'application/octet-stream') return resp.blob();
        }
        if (resp.status == 400) throw new Error('Bad Request:' + resp.url);
        if (resp.status == 403) throw new Error('Forbidden:' + resp.url);
        if (resp.status == 404) throw new Error('Page not found:' + resp.url);
        if (resp.status == 405) throw new Error('Method Not Allowed:' + resp.url);
        if (resp.status == 414) throw new Error('Request URI Too Long:' + resp.url);
        if (resp.status == 500) throw new Error('Internal Server Error:' + resp.url);
        if (resp.status == 502) throw new Error('Bad Gateway:' + resp.url);
    }
}