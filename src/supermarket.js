function addToCart(cart, item) {
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    return cart.map(i =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    return [...cart, { ...item, quantity: 1 }];
  }
}

function addMultipleToCart(cart, item, quantity) {
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    return cart.map(i =>
      i.id === item.id
        ? { ...i, quantity: i.quantity + quantity }
        : i
    );
  } else {
    return [...cart, { ...item, quantity }];
  }
}

function removeFromCart(cart, itemId) {
  return cart.filter(item => item.id !== itemId);
}

function getTotalItems(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalPrice(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(totalPrice, discountPercent) {
  const discount = (discountPercent / 100) * totalPrice;
  return totalPrice - discount;
}

module.exports = {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
  applyDiscount
};
