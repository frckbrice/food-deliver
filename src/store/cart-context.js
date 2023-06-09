import React from "react";
const CartContext = React.createContext({
  meals: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  deleteItem: (id) => {},
  clearall: () => {},
});

export default CartContext;
