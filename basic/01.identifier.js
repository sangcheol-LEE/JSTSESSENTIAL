// 식별자 정리.
let age = 10;

function setAge() {}

const o = {
  age: 10,
  ["myName"]: "김",
};

console.log(o.age);

console.log(o.myName);

/*
   식별자
   식별자는 코드 내의 변수, 함수, 혹은 속성을 식별하는 문자열
   JS 식별자는 대소문자 구별하고 유니코드로 구성 다만 숫자로 시작할 수 없고 식별자에 공백
   추가 불가능.

   관습적 컨벤션
   1. 상수는 대문자로 처리한다.
   2. 이름이 길어지게 될 경우 1. 카멜케이스 setAgeNumber , 2. 스네이크 케이스 set_age_number
   와 같이 표기함.
 */
