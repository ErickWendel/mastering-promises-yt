 npm init -y
 npm i -D mocha@8 nyc@15 sinon@9
  package.json
    "test:dev": "npx mocha -w --exit test/",
    "test": "npx mocha --parallel test/",
    "test:cov": "npx nyc --check-coverage --instrument --reporter=html --reporter=text npm test",
    "start": "node src/"

npm test 
npm run test:cov 

mkdir src
mkdir test 
touch test/request.test.js 

touch src/request.js 
    class Request {
      async makeRequest({ url, method, timeout }) {

      }
      async get (url) {

      }

test/request.test.js 
    import dependencies 
    describe
    sandbox
    request

    it(`should throw a timeout error when the function has spent more than ${timeout}ms`)
    it(`should return ok when promise time it is ok`)
    it('should return a JSON object after a request')

test/request.test.js 
  first it 

src/request
    errorTimeout 
    raceTimeoutDelay
    makeRequest

test/request.test.js 
  second it 

request.js 
  add comments on the end of file 
  all 

test/request.test.js 
  third it 
    all

npm t 
npm run test:cov 

src/index.js 
  all


https://www.mercadobitcoin.com.br/api-doc/

https://www.mercadobitcoin.net/api/BTC/ticker/
https://www.mercadobitcoin.net/api/BTC/trades/