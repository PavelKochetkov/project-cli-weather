const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.charAt(0) == '-') {
      const key = value.substring(1);
      if (index == array.length - 1) {
        res[key] = true;
      } else if (array[index + 1].charAt(0) != '-') {
        const nextVal = array[index + 1];
        if (res.hasOwnProperty(key)) {
          if (Array.isArray(res[key])) {
            res[key].push(nextVal);
          } else {
            res[key] = [res[key], nextVal];
          }
        } else {
          res[key] = nextVal;
        }
      } else {
        res[key] = true;
      }
    }
  });

  return res;
};

export { getArgs };