function addToCart(cart, item) {
  if (!item || typeof item.id !== 'number' || typeof item.price !== 'number') {
    throw new Error('Invalid item');
  }

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
  if (!item || typeof item.id !== 'number' || typeof item.price !== 'number') {
    throw new Error('Invalid item');
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    throw new Error('Invalid quantity');
  }

  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    return cart.map(i =>
      i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
    );
  } else {
    return [...cart, { ...item, quantity }];
  }
}

function removeFromCart(cart, itemId) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cannot remove from empty cart');
  }

  const exists = cart.some(item => item.id === itemId);
  if (!exists) {
    throw new Error('Item not found in cart');
  }

  return cart.filter(item => item.id !== itemId);
}

function getTotalItems(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalPrice(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(totalPrice, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid discount percentage');
  }

  return totalPrice - (discountPercent / 100) * totalPrice;
}

module.exports = {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
  applyDiscount
};
