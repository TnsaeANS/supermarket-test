const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
  applyDiscount
} = require('./supermarket');

describe('Supermarket Test Suite', () => {
  const apple = { id: 1, name: 'Apple', price: 1.5 };
  const banana = { id: 2, name: 'Banana', price: 1.0 };

  test('adds item to empty cart', () => {
    const cart = [];
    const newCart = addToCart(cart, apple);
    expect(newCart).toEqual([{ ...apple, quantity: 1 }]);
  });

  test('adds multiple items to cart', () => {
    const cart = [];
    const newCart = addMultipleToCart(cart, banana, 3);
    expect(newCart).toEqual([{ ...banana, quantity: 3 }]);
  });

  test('increments quantity for existing item', () => {
    const cart = [{ ...apple, quantity: 2 }];
    const newCart = addMultipleToCart(cart, apple, 2);
    expect(newCart).toEqual([{ ...apple, quantity: 4 }]);
  });

  test('removes item from cart', () => {
    const cart = [{ ...apple, quantity: 2 }, { ...banana, quantity: 1 }];
    const newCart = removeFromCart(cart, apple.id);
    expect(newCart).toEqual([{ ...banana, quantity: 1 }]);
  });

  test('calculates total items', () => {
    const cart = [
      { ...apple, quantity: 2 },
      { ...banana, quantity: 3 },
    ];
    expect(getTotalItems(cart)).toBe(5);
  });

  test('calculates total price', () => {
    const cart = [
      { ...apple, quantity: 2 }, 
      { ...banana, quantity: 3 },
    ];
    expect(getTotalPrice(cart)).toBe(6.0);
  });

  test('applies discount correctly', () => {
    const total = 100;
    const discounted = applyDiscount(total, 20);
    expect(discounted).toBe(80);
  });
});
