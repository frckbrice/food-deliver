import { Fragment } from "react";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import HeaderWithoutBtn from "../Layout/HeaderWithoutBtn";

const OrderDelivered = (props) => {
  const navigate = useNavigate();
  return (
    <main id={classes.main}>
      <HeaderWithoutBtn />
      <section id={classes.section}>
        <div className="div-icon">
          <FcApproval size={100} className="icon text-lime-600" />
        </div>

        <div>
          <h1>Thank you so much for your order!</h1>
          <p className={classes.p}>We really appreciate it. </p>
          <p className={classes.p}>
            Enjoy <b>10%</b> off your next purchase with this coupon code:
            <b>THANK YOU.</b>
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
