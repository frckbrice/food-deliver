import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState, memo } from "react";
import { toast } from "react-hot-toast";
import { getfoodInStock } from "../GetFoods";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const food = getfoodInStock(props.id);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = "0";
    toast(`Adding ${enteredAmountNumber} ${food.name} Meal in the cart`);
  };

  const inputData = {
    id: "amount_" + props.id,
    type: "number",
    min: "1",
    max: "10",
    step: "1",
    defaultValue: "1",
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label="Quantity" input={inputData} />

        <button>
          <span></span> Add To Cart
        </button>
        {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
      </form>
    </>
  );
};

export default memo(MealItemForm);
