import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price,
    });
  };

  return (
    <div className={classes.meal}>
      <div className={classes["single-food"]}>
        <img src={props.pict} alt="" className={classes.avatar} />
        <div className={classes.overlay}></div>
        <div className={classes["food-desc"]}>
          <span className={classes.span}>{props.name}</span> <br /> {" "}
          <br /> <br /> <br />
          <em>
            <strong>Click for More details</strong>
          </em>
        </div>
      </div>
      <div>
        {/* <div className={classes.description}>{props.description}</div> */}
        <div className={classes.price}>
          <span> Price: </span>
          {price}
        </div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
};

export default MealItem;
