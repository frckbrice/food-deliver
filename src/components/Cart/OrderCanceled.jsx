import { Fragment } from "react";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

const OrderCanceled = (props) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <section>
        <h2>Thank you so much for Visiting us!</h2>
        <p>We really appreciate it. </p>
        <p>We hope that next time you will get what you need</p>
      </section>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={() => {
            navigate("/");
          }}
        >
          Close
        </button>
      </div>
    </Fragment>
  );
};

export default OrderCanceled;
