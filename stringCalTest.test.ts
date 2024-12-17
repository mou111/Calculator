import {describe, expect, test} from '@jest/globals';
import {CalculateSum, NegNumException} from './index';

describe('String Calculator', () => {
  test('Returns 0 for an empty string', () => {
    expect(CalculateSum("")).toBe(0);
  });

  test('Returns the number for a single number string', () => {
    expect(CalculateSum("1")).toBe(1);
  });

  test('Returns the sum for a comma-separated string', () => {
    expect(CalculateSum("1,2,3")).toBe(6);
  });

  test('Returns the sum for a newline-separated string', () => {
    expect(CalculateSum("1\n2\n3")).toBe(6);
  });

  test('Returns the sum for a mixed comma and newline string', () => {
    expect(CalculateSum("1,2\n3")).toBe(6);
  });

  test('Handling custom delimiter', () => {
    expect(CalculateSum("//;\n1;2;3")).toBe(6);
  });

  test('Throws error for negative numbers', () => {
    expect(() => CalculateSum("1,2,-3")).toThrowError(new NegNumException("Negative numbers not allowed: -3"));
  });

  test('Throws error for multiple negative numbers', () => {
    expect(() => CalculateSum("1,-2,-3")).toThrowError(new NegNumException("Negative numbers not allowed: -2, -3"));
  });

  test('Handles multiple custom delimiters', () => {
    expect(CalculateSum("//;\n1;2;3")).toBe(6);
    expect(CalculateSum("//|\n1|2|3|4")).toBe(10);
  });
});
