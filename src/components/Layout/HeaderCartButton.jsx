import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GetMeals } from "../../store/functions";

const HeaderCartButton = (props) => {
  const navigate = useNavigate();

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { meals } = cartCtx;
  // const { meals } = GetMeals();

  console.log("in header button meals is", meals);

  // const spanref = useRef();

  // console.log("in header button ref value is", spanref.current.value);

  const numberOfCartmeals = meals.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    // spanref.current.value = numberOfCartmeals;

    if (meals.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [meals, numberOfCartmeals]);

  return (
    <button
      className={btnClasses}
      onClick={() => navigate(`/foodDetail/ShowCart`)}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartmeals}</span>
    </button>
  );
};

export default memo(HeaderCartButton);
