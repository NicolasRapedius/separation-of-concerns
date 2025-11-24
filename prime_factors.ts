// Cache for generated primes to avoid recomputation across multiple calls.
let cachedPrimes: number[] = [];
let cachedLimit = 1;

function generatePrimes(limit: number): number[] {
  if (limit <= cachedLimit) {
    // We already have primes up to at least this limit.
    return cachedPrimes.filter((p) => p <= limit);
  }
  // Sieve of Eratosthenes up to new limit.
  const sieve = new Array<boolean>(limit + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let p = 2; p * p <= limit; p++) {
    if (sieve[p]) {
      for (let multiple = p * p; multiple <= limit; multiple += p) {
        sieve[multiple] = false;
      }
    }
  }
  cachedPrimes = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) cachedPrimes.push(i);
  }
  cachedLimit = limit;
  return cachedPrimes.slice();
}

// Pure function: factorizes a single positive integer into prime factors.
export function factorize(n: number): number[] {
  if (n < 0) throw new Error("negative numbers are not supported");
  if (n === 0) throw new Error("zero cannot be factorized into primes");
  if (n === 1) return [];
  const factors: number[] = [];
  const limit = Math.floor(Math.sqrt(n));
  const primes = generatePrimes(limit);
  let remainder = n;
  for (const p of primes) {
    if (p * p > remainder) break;
    while (remainder % p === 0) {
      factors.push(p);
      remainder /= p;
    }
  }
  if (remainder > 1) factors.push(remainder); // remainder is prime
  return factors;
}

// Pure function: factorizes an array of numbers and returns mapping.
export function factorizeAll(numbers: number[]): Array<{ number: number; factors: number[] }> {
  return numbers.map((n) => ({ number: n, factors: factorize(n) }));
}

// Backwards-compatible wrapper that prints results (side-effect concern separated from computation).
export function factor(numbers: Array<number>) {
  const results = factorizeAll(numbers);
  for (const r of results) {
    console.log(`${r.number}: ${r.factors.join(", ")}`);
  }
}
