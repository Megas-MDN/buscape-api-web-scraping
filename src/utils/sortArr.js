module.exports = (arr) => {
  const myArr = [...arr];
  const sortedArr = [];
  const randIndex = (ar) => Math.floor(Math.random() * ar.length);
  for (let i = 0; i < arr.length; i += 1) {
    const item = myArr.splice(randIndex(myArr), 1)[0];
    sortedArr.push(item);
  }
  return sortedArr;
};
