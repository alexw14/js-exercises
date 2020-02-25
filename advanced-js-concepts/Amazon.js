// Functional Programming Exercise

const user = {
  name: 'Alex',
  active: true,
  cart: [],
  purchases: []
}

const compose = (f, g) => (...args) => f(g(...args));

purchaseItem(
  emptyCart,
  buyItem,
  applyTax,
  addToCart
)(user, { name: 'laptop', price: 1000 })

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function addToCart(user, item) {
  const updatedCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updatedCart });
}

function applyTax(user) {
  const { cart } = user;
  const taxRate = 1.10;
  const updatedCart = cart.map(item => {
    return {
      name: item.name,
      price: item.price * taxRate
    }
  });
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
  return Object.assign({}, user, { purchaseItem: user.cart });
}

function emptyCart(user) {
  return Object.assign({}, user, { cart: [] });
}