/*
   인스턴스
   인스턴스는 클래스라고 하는 설계도가 구체적으로 현실화된 객체를 인스턴스라 함

   인스턴스를 만드는 방법은 js 안에서 2가지
   1. 생성자 함수
   2. 클래스
*/

function CartV1() {
  this.cart = [];
  this.currentId = 0;
}

CartV1.prototype.getNewId = function () {
  this.currentId++;
  return this.currentId;
};

CartV1.createItem = function (name, price) {
  return name, price;
};

CartV1.prototype.addItem = function (item) {
  this.cart.push({
    ...item,
    id: this.getNewId(),
  });
};

CartV1.prototype.clearCart = function (item) {
  this.cart = [];
  this.currentId = 0;
};

const shoppingCart = new CartV1();

shoppingCart.addItem(CartV1.createItem("수박", 8000));
shoppingCart.addItem(CartV1.createItem("사과", 18000));
shoppingCart.addItem(CartV1.createItem("두부", 82000));

console.log(shoppingCart.cart);

// 현대적인 방법 - class
class CartV2 {
  static createItem = (name, price) => ({
    name,
    price,
  });

  cart;
  createId;

  constructor() {
    this.cart = [];
    this.createId = 0;
  }

  getNewId = () => {
    this.createId++;
    return this.createId;
  };

  addItem = (item) => {
    this.cart.push({
      ...item,
      id: this.getNewId(),
    });
  };

  clearCart = () => {
    this.currentId = 0;
    this.cart = [];
  };
}

const shoppingCart2 = new CartV2("수박", 8000);
const shoppingCart3 = new CartV2("두부", 80200);
const shoppingCart4 = new CartV2("망고", 14200);
