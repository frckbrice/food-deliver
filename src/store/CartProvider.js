import CartContext from "./cart-context.js";
import { useReducer } from "react";
import { set, DeleteMeal } from "./functions.jsx";
import PropTypes from "prop-types";

const defaultCartState = {
  meals: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  console.log('before add',state, action);

  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    const existingCartItemIndex = state.meals.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.meals[existingCartItemIndex];
    let updatedMeals;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedMeals = [...state.meals];
      updatedMeals[existingCartItemIndex] = updatedItem;
    } else {
      updatedMeals = state.meals.concat(action.item);
    }

    const cart = {
      meals: updatedMeals,
      totalAmount: updatedTotalAmount,
    };

    set("meals", cart);

    return cart;
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.meals.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.meals[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedMeals;
    if (existingItem.quantity === 1) {
      updatedMeals = state.meals.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedMeals = [...state.meals];
      updatedMeals[existingCartItemIndex] = updatedItem;
    }

    const cart = {
      meals: updatedMeals,
      totalAmount: updatedTotalAmount,
    };

     set("meals", cart);

    return cart;
  }

  if (action.type === "DELETE") {
    const isDeleted = DeleteMeal(action.id);

    return isDeleted;
  }

  if (action.type === "CLEARALL") {
    const cart = {
      meals: [],
      totalAmount: 0,
    };

     set("meals", cart);

    return cart;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    console.log(item);

    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const clearAllmealsFromCartHandler = () => {
    dispatchCartAction({ type: "CLEARALL" });
  };

  const cartContext = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    deleteItem: deleteItemFromCartHandler,
    clearall: clearAllmealsFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  dispatchCartAction: PropTypes.func,
  cartReducer: PropTypes.func,
  item: PropTypes.object,
  totalAmount: PropTypes.number,
  existingCartItem: PropTypes.object,
  existingCartItemIndex: PropTypes.number,
  updatedItem: PropTypes.object,
  updatedMeals: PropTypes.arrayOf(),
  addItemToCartHandler: PropTypes.func,
  removeItem: PropTypes.func,
  addItem: PropTypes.func,
  deleteMeal: PropTypes.func,
  deleteItem: PropTypes.func,
  clearall: PropTypes.func,
  removeItemFromCartHandler: PropTypes.func,
  deleteItemFromCartHandler: PropTypes.func,
  clearAllmealsFromCartHandler: PropTypes.func,
};

export default CartProvider;
