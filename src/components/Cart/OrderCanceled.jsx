import { Fragment } from "react";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import HeaderWithoutBtn from "../Layout/HeaderWithoutBtn";

const OrderDelivered = (props) => {
  const navigate = useNavigate();
  return (
    <main id={classes.main}>
      <HeaderWithoutBtn />
      <section id={classes.section}>
        <div className="div-icon">
          <FcCancel size={100} className="icon text-lime-600" />
        </div>

        <div>
          <h1>Sorry for your cancel! </h1>
          <p className={classes.p}>
            We hope you will make a payement next time.{" "}
          </p>
        </div>
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
    </main>
  );
};

export default OrderDelivered;
