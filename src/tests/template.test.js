import { it, expect } from '@jest/globals';

function sum(a, b) {
  return a + b;
}

it('should returns sum of 2 numbers', () => {
  expect(sum(2, 3)).toBe(5);
});
