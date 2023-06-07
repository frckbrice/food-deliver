import { Fragment } from "react";
import classes from "../../Layout/Header.module.css";
import HeaderCartButton from "../../Layout/HeaderCartButton";

const HeaderFoodDetail = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default HeaderFoodDetail;