import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Navbar from "./NavBar";
import mainheaderImage from "../../assests/headerBanner.jpg";

const HeaderFoodDetail = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <HeaderCartButton />
        <Navbar />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default HeaderFoodDetail;
