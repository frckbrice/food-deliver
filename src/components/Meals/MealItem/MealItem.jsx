import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext, memo, useCallback } from "react";
import CartContext from "../../../store/cart-context";
import { Link } from "react-router-dom";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${parseInt(props.price).toFixed(2)}`;

  const addToCartHandler = useCallback(
    (quantity) => {
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
        avatar: props.avatar,
      });
    },
    [props.name, props.price, props.id, cartCtx, props.avatar]
  );

  return (
    <div className={classes.meal}>
      <div className={classes["single-food"]}>
        <Link to={`/foodDetails/${props.id}`}>
          <img src={props.avatar} alt="" className={classes.avatar} />

          <div className={classes.overlay}></div>
          <div className={classes["food-desc"]}>
            <span className={classes.span}>{props.name}</span> <br />
            <br />
            <em>
              <strong>Click for More details</strong>
            </em>
          </div>
        </Link>
      </div>

      <div>
        <div className={classes.price}>
          <span> Price: &nbsp;</span>
          {props.favorite && <span>★</span>}
          {price}
        </div>
      </div>
      <div className="MealItemForm pb-2">
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
};

export default memo(MealItem);
