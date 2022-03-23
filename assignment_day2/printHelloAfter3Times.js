function printHello() {
  return "Hello";
}

function after(count, cb) {
  if (count === 0) {
    console.log(cb());
    return;
  }
  after(count - 1, cb);
}

after(3, printHello);
