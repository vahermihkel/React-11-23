// export const calculateCartSum = (cartLS, dbProducts) => {
//   if (dbProducts === undefined || dbProducts.length === 0) return "0.00"
//   const cartWithProducts = cartLS.map(cartProduct => ({
//     "quantity": cartProduct.quantity,
//     "product": dbProducts.find(dbProduct => dbProduct.id === cartProduct.productId)
//   }));
//   console.log(cartWithProducts);
//   let sum = 0;
//   cartWithProducts.forEach(p => sum = sum + p.product.price * p.quantity);
//   console.log(sum);
//   return sum.toFixed(2);
// };

export const calculateCartSum = (cart) => {
  let sum = 0;
  cart.forEach(p => sum = sum + p.product.price * p.quantity);
  return sum.toFixed(2);
};

export const calculateTotalItems = (cart) => {
  let count = 0;
  cart.forEach((p) => (count += p.quantity));
  return count;
};

// export const calculateTotalItems = (cartLS, dbProducts) => {
//   if (dbProducts === undefined || dbProducts.length === 0) return 0
//   const cartWithProducts = cartLS.map(cartProduct => ({
//     "quantity": cartProduct.quantity,
//     "product": dbProducts.find(dbProduct => dbProduct.id === cartProduct.productId)
//   }));
//   let count = 0;
//   cartWithProducts.forEach((p) => (count += p.quantity));
//   return count;
// };
