import CartContext from "./cart-context.js";
import { useReducer, useCallback } from "react";
import { Set as set } from "./functions.jsx";
import PropTypes from "prop-types";

const defaultCartState = {
  meals: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  //*ADD

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
  //*REMOVE
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

  //* DELETE
  if (action.type === "DELETE") {
    console.log(state.meals, "state.meals");

    const existingCartItemIndex = state.meals.findIndex(
      (item) => item.id === action.id
    );
    console.log(existingCartItemIndex, "existingCartItemIndex");

    const existingItem = state.meals[existingCartItemIndex];
    console.log(existingItem, "existingItem");
    console.log(state.meals, "state.meals");

    console.log(state.totalAmount, " state.totalAmount");

    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.quantity;
    console.log(updatedTotalAmount, "updatedTotalAmount");

    const updatedMeals = state.meals.filter((item) => item.id !== action.id);

    const cart = {
      meals: updatedMeals,
      totalAmount: updatedTotalAmount,
    };

    set("meals", cart);
    return cart;
  }

  //* CLEARALL
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
//*PROVIDER COMP.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // console.log(item);

    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemFromCartHandler = useCallback((id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  }, []);

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
