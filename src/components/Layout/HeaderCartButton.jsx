import { TiShoppingCart } from "react-icons/ti";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../store/useLocalStorage";

const HeaderCartButton = memo((props) => {
  const navigate = useNavigate();

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { meals } = cartCtx;
  // const { meals } = useLocalStorage("meals");
  // const { meals } = getMeals();

  console.log(meals);

  const numberOfCartmeals = meals.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  console.log("numberOfCartmeals", numberOfCartmeals);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
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
  }, []);

  return (
    <button
      className={btnClasses}
      onClick={() => navigate(`/foodDetail/ShowCart`)}
    >
      <span className={classes.icon}>
        <TiShoppingCart size={30} />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartmeals}</span>
    </button>
  );
});

export default HeaderCartButton;
