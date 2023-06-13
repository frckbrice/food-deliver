import { Fragment } from "react";
import mainheaderImage from "../../assests/headerBanner.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <Link to="/foodDetail/ShowCart">
          <HeaderCartButton />
        </Link>
        <Navbar />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
