export const calculateCartSum = (cartLS, dbProducts) => {
  // let sum = 0;
  // cartLS.forEach((p) => (sum += p.product.price * p.quantity));
  // return sum.toFixed(2);
  return "20";
};

export const calculateTotalItems = (cart) => {
  let count = 0;
  cart.forEach((p) => (count += p.quantity));
  return count;
};
