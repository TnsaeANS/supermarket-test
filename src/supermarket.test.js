const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
  applyDiscount,
} = require("./supermarket");

describe("Supermarket Test Suite", () => {
  const apple = { id: 1, name: "Apple", price: 1.5 };
  const banana = { id: 2, name: "Banana", price: 1.0 };

  test("adds item to empty cart", () => {
    const cart = [];
    const newCart = addToCart(cart, apple);
    expect(newCart).toEqual([{ ...apple, quantity: 1 }]);
  });

  test("throws when adding invalid item", () => {
    const cart = [];
    expect(() => addToCart(cart, { name: "Orange" })).toThrow("Invalid item");
  });

  test("throws when adding with invalid quantity", () => {
    const cart = [];
    expect(() => addMultipleToCart(cart, { id: 1, price: 2 }, 0)).toThrow(
      "Invalid quantity"
    );
  });

test("removes item and returns empty cart", () => {
  const cart = [];
  const newCart = addToCart(cart, apple);
  expect(newCart).toEqual([{ ...apple, quantity: 1 }]);
  const finalCart = removeFromCart(newCart, 1);
  expect(finalCart).toEqual([]);
});

test("throws when removing non-existent item", () => {

  const cart = [{id: 1, name: "Apple", price: 1.5, quantity: 2 }];
  const nonExistentItemId = 99;
  expect(() => removeFromCart(cart, nonExistentItemId)).toThrow("Item not found in cart");
  expect(cart).toEqual([{id: 1, name: "Apple", price: 1.5, quantity: 2 }]);
});

  test("adds multiple items to cart", () => {
    const cart = [];
    const newCart = addMultipleToCart(cart, banana, 3);
    expect(newCart).toEqual([{ ...banana, quantity: 3 }]);
  });

  test("increments quantity for existing item", () => {
    const cart = [{ ...apple, quantity: 2 }];
    const newCart = addMultipleToCart(cart, apple, 2);
    expect(newCart).toEqual([{ ...apple, quantity: 4 }]);
  });

  test("removes item from cart", () => {
    const cart = [
      { ...apple, quantity: 2 },
      { ...banana, quantity: 1 },
    ];
    const newCart = removeFromCart(cart, apple.id);
    expect(newCart).toEqual([{ ...banana, quantity: 1 }]);
  });

  test("calculates total items", () => {
    const cart = [
      { ...apple, quantity: 2 },
      { ...banana, quantity: 3 },
    ];
    expect(getTotalItems(cart)).toBe(5);
  });

  test("calculates total price", () => {
    const cart = [
      { ...apple, quantity: 2 },
      { ...banana, quantity: 3 },
    ];
    expect(getTotalPrice(cart)).toBe(6.0);
  });

  test("applies discount correctly", () => {
    const total = 100;
    const discounted = applyDiscount(total, 20);
    expect(discounted).toBe(80);
  });

  test("throws when discount is over 100%", () => {
    expect(() => applyDiscount(100, 110)).toThrow(
      "Invalid discount percentage"
    );
  });

  test("throws when discount is negative", () => {
    expect(() => applyDiscount(100, -10)).toThrow(
      "Invalid discount percentage"
    );
  });
});
