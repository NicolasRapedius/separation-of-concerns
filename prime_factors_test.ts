/// <reference lib="deno.ns" />
import { expect } from "@std/expect";
import { factorize, factorizeAll } from "./prime_factors.ts";

function product(nums: number[]): number {
  return nums.reduce((acc, v) => acc * v, 1);
}

Deno.test("factorize single composites", () => {
  expect(factorize(10)).toEqual([2, 5]);
  expect(factorize(42)).toEqual([2, 3, 7]);
  expect(factorize(55)).toEqual([5, 11]);
  expect(factorize(99)).toEqual([3, 3, 11]);
});

Deno.test("factorize powers of two", () => {
  expect(factorize(1024)).toEqual(new Array(10).fill(2));
});

Deno.test("factorize primes and edge cases", () => {
  expect(factorize(13)).toEqual([13]);
  expect(factorize(1)).toEqual([]); // 1 has no prime factors
});

Deno.test("factorizeAll returns correct mapping and reconstruction", () => {
  const input = [10, 42, 13, 1];
  const result = factorizeAll(input);
  expect(result.map((r) => r.number)).toEqual(input);
  for (const r of result) {
    if (r.number > 1) {
      expect(product(r.factors)).toBe(r.number);
    } else {
      expect(r.factors).toEqual([]);
    }
  }
});

Deno.test("performance smoke: large prime remains prime", () => {
  // 104729 is the 10000th prime.
  expect(factorize(104729)).toEqual([104729]);
});
