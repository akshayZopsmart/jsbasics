function zoin(...args) {
  let result = "";
  for (let val of args) {
    result += val;
  }
  return result;
}

console.log(zoin("a", "b", "c"));
