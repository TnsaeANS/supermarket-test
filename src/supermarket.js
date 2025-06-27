function validateItem(item) {
  if (!item || typeof item.id !== 'number' || typeof item.price !== 'number') {
    throw new Error('Invalid item: must have numeric id and price');
  }
}

function validateCart(cart) {
  if (!Array.isArray(cart)) {
    throw new Error('Cart must be an array');
  }
}

function validateQuantity(quantity) {
  if (typeof quantity !== 'number' || quantity < 1) {
    throw new Error('Invalid quantity: must be a number greater than 0');
  }
}

function validateDiscount(discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid discount percentage: must be between 0 and 100');
  }
}

function addToCart(cart, item) {
  validateItem(item);
  validateCart(cart);
  
  const newCart = [...cart];
  const existingItemIndex = newCart.findIndex(i => i.id === item.id);
  
  if (existingItemIndex !== -1) {
    newCart[existingItemIndex].quantity += 1;
  } else {
    newCart.push({ ...item, quantity: 1 });
  }
  
  return newCart;
}

function addMultipleToCart(cart, item, quantity) {
  validateItem(item);
  validateCart(cart);
  validateQuantity(quantity);
  
  const newCart = [...cart];
  const existingItemIndex = newCart.findIndex(i => i.id === item.id);
  
  if (existingItemIndex !== -1) {
    newCart[existingItemIndex].quantity += quantity;
  } else {
    newCart.push({ ...item, quantity });
  }
  
  return newCart;
}

function removeFromCart(cart, itemId) {
  validateCart(cart);
  if (cart.length === 0) throw new Error('Cannot remove from empty cart');
  
  const index = cart.findIndex(item => item.id === itemId);
  if (index === -1) throw new Error('Item not found in cart');
  
  return [...cart.slice(0, index), ...cart.slice(index + 1)];
}

function getTotalItems(cart) {
  validateCart(cart);
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalPrice(cart) {
  validateCart(cart);
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(totalPrice, discountPercent) {
  if (typeof totalPrice !== 'number') {
    throw new Error('Total price must be a number');
  }
  validateDiscount(discountPercent);
  
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