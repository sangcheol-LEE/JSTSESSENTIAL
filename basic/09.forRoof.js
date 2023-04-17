const arr = ["a", "b", "c", "d", "e"];

console.log("===========================================================");
console.log("1. 기본 for 문");

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

/*
   ;(세미콜론 기준)
   1. 반복을 최초에 시작할 때  한 번 실행 되는 영역
   - 보통 반복할 초기값 같은 것들을 지정할 때 많이 사용

   2. 2번째 영역은 "비교" 입니다. 어떤 비교냐면, if문의 비교와 똑같은 비교식이 들어오는데,
   이 비교가 참인 동안 반복이 계속 됩니다. 거짓이 되면 반복을 멈춥니다.

   3. 마지막 구간은 첫 번째 반복이 시작되고 나서 그 다음부터 다시 반복을 하게 되면,
   반드시 실행하게 되는 코드 영역입니다.
*/

console.log("===========================================================");
console.log("2. while 문");

let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
console.log("===========================================================");
console.log("3. do while 문");

i = 0; // 초기화
do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);
console.log("===========================================================");
console.log("4. for of 문");

for (const item of arr) {
  console.log("item", item);
}
/*
   for of 반복문은 처음부터 끝까지 한 번씩 읽으면서 순회할 때 , 배열의 특정 위치에 관심이 없는
   상황에서 굉장히 쓰기 편합니다.
*/

console.log("===========================================================");
console.log("5. for in 문");

for (const index in arr) {
  console.log("index", index);
  console.log(arr[index]);
}

const obj = {
  color: "red",
  width: 200,
  height: 200,
};

for (const key in obj) {
  console.log("key", key);
}
/*
   array가 배열이든 객체이든 그 키의 값을 하나씩 꺼내올 때 많이 쓰게 되는 반복문.
   배열일 땐 index 를 출력하고, 객체일 땐 순회하는 객체의 key를 출력함.
*/

console.log("===========================================================");
