import React, { useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import CartContext from "../../../store/cart-context";
import classes from "./ShowCartDetail.module.css";
// import HeaderFoodDetail from "../../Layout/HeaderFoodDetail";
import "./ShowCartDetail.module.css";
import Emptyplate from "../../../assests/emptyplate.png";
import Card2 from "../../UI/Card2";
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header";

const ShowCart = () => {
  const navigate = useNavigate();

  toast.success("This is the content of your cart content!");

  const cartCtx = useContext(CartContext);

  const { totalAmount, meals, removeItem, deleteItem, addItem } = cartCtx;
  console.log("total amount in showcartdetail", totalAmount);

  return (
    <>
      <Header />
      <div className={classes["cart-wrapper"]}>
        <Card2>
          <div className={classes["cart-meals"]}>
            {meals.length < 1 && (
              <div className={classes["empty-cart"]}>
                <img src={Emptyplate} alt="" className={classes.emptyplate} />
                <h1 className="text-empty-cart" style={{ fontSize: "20" }}>
                  Oops! <br /> No Food ordered.
                </h1>
              </div>
            )}
            {meals.length >= 1 &&
              meals.map((item) => (
                <div key={item.id} className={classes["item-card"]}>
                  <div className={classes["div2-image"]}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={classes["food-image2"]}
                    />
                  </div>

                  <div className={classes["item-details"]}>
                    <div className={classes["name-and-trash"]}>
                      <h3 className="text-3xl">{item.name}</h3>
                      <p>
                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          className={classes["remove-item"]}
                        >
                          <HiOutlineTrash size={50} />
                        </button>
                      </p>
                    </div>

                    <div className={classes["deliv-est"]}>
                      <p className={classes["delivery-est"]}>
                        Delivery Estimation : <br /> From{" "}
                        <strong className={classes["text-green"]}>
                          &nbsp;&nbsp;30 &nbsp; Minutes to 1 hour
                        </strong>{" "}
                      </p>
                    </div>

                    <div className={classes["price"]}>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className={classes["flex"]}>
                      <span
                        className={classes.minus}
                        onClick={() => removeItem(item.id)}
                      >
                        <AiOutlineMinus />
                        Remove
                      </span>
                      <span className={classes["num"]}>
                        {item.quantity} &nbsp;&nbsp;
                      </span>
                      <span
                        className={classes["plus"]}
                        onClick={() => addItem({ ...item, quantity: 1 })}
                      >
                        <AiOutlinePlus />
                        Add
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* bg-ctatransparent */}

          {meals.length >= 1 && (
            <div className={classes["order-summary"]}>
              <h3 className={classes["title"]}>Order Summary</h3>
              <div className={classes["qty"]}>
                <p>
                  Quantity: &nbsp;&nbsp;
                  <strong className={classes["text-green"]}>
                    {meals.length} &nbsp;&nbsp; Product(s)
                  </strong>{" "}
                </p>
              </div>
              <div className={classes["subtotal"]}>
                Sub Total : &nbsp;&nbsp;{" "}
                <span className={classes["text-green"]}>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className={classes.divbtn}>
                {/* <Link to="foodDetails/:foodId/showCart/checkoutPayement"> */}
                <button
                  className={classes["btn"]}
                  type="button"
                  onClick={() => {
                    navigate("/foodDetail/ShowCart/PayementDetails");
                  }}
                >
                  Process to Checkout
                </button>
                {/* </Link> */}
              </div>
            </div>
          )}
        </Card2>
      </div>
    </>
  );
};

export default ShowCart;
