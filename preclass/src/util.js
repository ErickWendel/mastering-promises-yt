
const https = require('https');

class Request {
    static #errorTimeout = (reject, urlRequest) => () =>
        reject(new Error(`timeout at [${urlRequest}] :(`));

    raceTimeoutDelay(fnName, timeout) {
        return new Promise((resolve, reject) =>
            setTimeout(Request.#errorTimeout(reject, fnName), timeout),
        );
    }
    race({ urlRequest, timeout, promiseFn }) {
        return (
            Promise.race([
                promiseFn(),
                this.raceTimeoutDelay(urlRequest, timeout)
            ])
        );
    }

    get(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                res.on('data', data => resolve(JSON.parse(data)))
                res.on('error', reject)
            })
        })
    }
    async makeRequest({ url, method, timeout }) {
        return this.race({
            url,
            timeout,
            promiseFn: () => this[method](url)
        });
    }
}
module.exports = Request