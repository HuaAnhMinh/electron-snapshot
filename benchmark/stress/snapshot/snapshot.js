function fibonacci(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

const fib_40 = fibonacci(40);