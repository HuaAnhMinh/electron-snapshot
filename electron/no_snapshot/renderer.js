const fib_40 = require('./startup');

setTimeout(() => {
  document.getElementById('fib_40').textContent = fib_40;
}, 2000);
console.log(Date.now());