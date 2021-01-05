
const https = require('https');

class Request {
    static #errorTimeout = (reject, urlRequest) => () =>
        reject(new Error(`timeout at [${urlRequest}] :(`));

    raceTimeoutDelay(url, timeout) {
        return new Promise((resolve, reject) =>
            setTimeout(Request.#errorTimeout(reject, url), timeout),
        );
    }
    race({ url, timeout, promiseFn }) {

        return (
            Promise.race([
                promiseFn.call(),
                this.raceTimeoutDelay(url, timeout)
            ])
        );
    }

    get = (url) => () => {

        return new Promise((resolve, reject) => {

            https.get(url, (res) => {
                const items = []
                res
                .on("data", data => items.push(data))
                .on("end", () => resolve(JSON.parse(items.join(""))))
            })
                .on('error', reject)

        })
    }
    async makeRequest({ url, method, timeout }) {
        return this.race({
            url,
            timeout,
            promiseFn: this[method](url)
        });
    }
}
module.exports = Request

