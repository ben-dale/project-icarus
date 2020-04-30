const RandomInteger = require('./RandomInteger');

test('returns 1', () => {
  expect(new RandomInteger().between(1, 1)).toBe(1);
});
