const obj = {
  b: 10,
  c: {
    d: {
      e: 20,
    },
  },
};

function show(obj) {
  if(obj === null || typeof obj !== 'object'){
    return obj;
  }
  let copy_obj = {};
  Object.keys(obj).forEach((key) => {
    if(obj.hasOwnProperty(key)){
      copy_obj[key] = show(obj[key]);
    }
  });

  return copy_obj;
}

let cloneObj = show(obj);
obj.c.d.e = 30;
console.log(obj.c.d.e); // should print 30
console.log(cloneObj.c.d.e); // should print 20
