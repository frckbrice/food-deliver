import { TiShoppingCart } from "react-icons/ti";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCartButton = memo((props) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  // localStorage.removeItem("meals");

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { meals } = cartCtx;

  const numberOfCartmeals = meals.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const handleAddItem = () => {
    setNav(true);
  };

  useEffect(() => {
    if (meals.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    if (nav) {
      navigate(`/foodDetail/ShowCart`);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [meals, nav, navigate]);

  return (
    <button className={btnClasses} onClick={handleAddItem}>
      <span className={classes.icon}>
        <TiShoppingCart size={30} />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartmeals}</span>
    </button>
  );
});

export default HeaderCartButton;
