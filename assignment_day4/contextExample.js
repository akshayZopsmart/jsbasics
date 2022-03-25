const counter = {
  value: 0,
  increment() {
    this.value += 1;
    return this;
  },
  decrement() {
    this.value -= 1;
    return this;
  },
};

// counter.increment(); // value is 1
// counter.increment(); // value is 2
// counter.decrement(); // value is 1
counter.increment().increment().decrement();
console.log(counter.value);
