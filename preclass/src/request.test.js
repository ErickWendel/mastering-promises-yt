const assert = require('assert');
const Request = require('./request');

const timeout = 15;
const request = new Request();

describe('Request helpers', function () {
  this.timeout(5000);

  it(`should be a timeout error when the function has more time than ${timeout}`, async () => {
    try {
      const fn = () =>
        new Promise(resolve => setTimeout(() => resolve, timeout));
      await request.race({ urlRequest: 'testing.com', timeout, promiseFn: fn });
    } catch (error) {
      assert.ok(error.message.includes('timeout'));
    }
  });
  it(`should return ok when promise time it is ok`, async () => {
    const expected = 'OK';
    const fn = () =>
      new Promise(resolve => setTimeout(() => resolve(expected), timeout / 4));
    const result = await request.race({ urlRequest: 'testing.com', timeout, promiseFn: fn });
    assert.deepStrictEqual(result, expected);
  });
});