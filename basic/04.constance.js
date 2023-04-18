let x = 10;
const y = 200;

x = 200;
x = 300;

// 변수는 재할당 가능
// 상수는 최초에 할당 된 값만 넣을 수 있다.

const obj = {
  height: 200,
  width: 300,
};

obj.height = 300;

console.log(obj);

// 상수를 많이 쓰는 것을 권고한다.
