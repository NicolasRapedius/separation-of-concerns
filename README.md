# Separation of Concerns

This project demonstrates the concept of _Separation of Concerns_ with code that is totally devoid of it. The examples are:

1. [Multiplication Table](https://www.mathsisfun.com/tables.html) (`multiplication_table.ts`)
2. [Prime Factors](https://www.mathsisfun.com/prime-factorization.html) (`prime_factors.ts`)
3. [Monty Hall Problem](https://en.wikipedia.org/wiki/Monty_Hall_problem) (`monty_hall.ts`)

The examples can be run as follows:

    deno run multiplication_table_demo.ts
    deno run prime_factors_demo.ts
    deno run monty_hall_demo.ts

There are _no_ tests implemented in the `*_test.ts` files yet, because they'd be too tedious to write due to the lack of Separation of Concerns in the code.

Your task is to clean up the mess, and then to write tests for the improved code.

## Refactoring Notes (Prime Factors)

The `prime_factors.ts` module was refactored to separate concerns:

* Pure computation (`factorize` for a single number, `factorizeAll` for arrays)
* Side-effectful printing wrapper (`factor`) retained for backwards compatibility
* Performance improved using a Sieve of Eratosthenes with caching of generated primes

This allows straightforward unit testing without capturing console output.

Run all the tests:

    deno test

Run individual tests:

    deno test multiplication_table_test.ts
    deno test prime_factors_test.ts
    deno test monty_hall_test.ts