/*
   예외
   예외적인 상황을 어떻게 처리할 것인가 ?
   오류를 어떻게 처리할까


 */

const doException = () => {
  throw new Error("gooood this is error");
};

const main = () => {
  try {
    doException();
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finally...");
  }
};

main();
