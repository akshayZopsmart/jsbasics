const obj = {
  b: 10,
  c: {
    d: {
      e: 20,
    },
  },
};
let map = new Map();

function show(obj) {
  for (let ob in obj) {
    map.set(ob,obj[ob]);
    if(typeof obj[ob] === 'object'){
       show(obj[ob]);
    }
    console.log(ob,obj[ob]);
  }
}

show(obj);
console.log(map);
