let a = 10;
let b = a;

b = 20;

console.log("a", a);
console.log("b", b);

/*
   기본형 데이터 타입은 값이 복사된다.

   참조되는 값은 기본형을 제외한 다른 타입은 참조 된다.

   참조는 무엇?

   객체형 데이터 타입은 객체는 한곳에 저장되어 있고 위치값만 변수에 기록된다.
   같은 녀석을 가르킨다. 그래서 o2 객체의 속성은 원본 객체의 속성을 가르키므로
   같은 객체라 값이 둘 다 변하는 것.

   객체는 대입문을 통해서는 절대 복사가 되지 않는다.
   언제나 하나만 존재한다.
*/

let o = {
  isLoading: false,
};

let o2 = o;

function foo(o) {
  o.isLoading = true;
}

foo(o);

console.log("o", o);
console.log("o2", o2);

// 객체는 절대로 복사되지 않고 참조된다는 걸 늘 인지하고 이해하고 있어야한다.
