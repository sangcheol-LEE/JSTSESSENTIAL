/*
   타입은 값의 유형을 나타내는 의미.
*/

const addAges = (age: number): number => {
  return age + 1;
};

let age: number = addAges(30);

console.log("TS_age", age);
