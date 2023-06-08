import React, { useRef, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
import CartContext from "../../../store/cart-context";
import './ShowCartDetail.module.css'
import Header from "../../Layout/Header";
import './ShowCartDetail.module.css'

const ShowCart = () => {
  toast.success("This is the content of your cart content!");

  const cartRef = useRef();

  const cartCtx = useContext(CartContext);

  const { totalAmount, items, removeItem, deleteItem, addItem } = cartCtx;

  // console.log(incQty)

  // const { totalAmount, items } = JSON.parse(
  //   localStorage.getItem("updatedItems")
  // );
  // console.log(items);

  // const [quantity, setQuantity] = useState();

  const handleCheckout = () => {};

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <Header />
      {totalAmount ? <h2 className="empty-card">Empty Cart</h2> : ""}
      <div className="cart-container">
        <div className="cart-items">
          {items.length < 1 && (
            <div className="empty-cart">
              <TiShoppingCart size={300} />
              <h1 className="text-3xl" style={{ fontSize: "20" }}>
                Your shopping bag is empty
              </h1>
            </div>
          )}

          {items.length >= 1 &&
            items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="div2-image">
                  <img
                    src={item.pict}
                    alt={item.name}
                    className="food-image2"
                  />
                </div>
                <div className="item-details">
                  <div className="name-and-remove">
                    <div
                      className="flex mb-2"
                      style={{ display: "flex", marginBottom: "20" }}
                    >
                      <h3
                        className="mr-5 text-3xl"
                        style={{ marginRight: "50", fontSize: "20" }}
                      >
                        {item.name}
                      </h3>
                      <button
                        type="buttin"
                        onClick={() => deleteItem(item.id)}
                        className="remove-item ml-12 text-red text-2xl"
                      >
                        <HiOutlineTrash size={28} />
                      </button>
                    </div>
                    <div className="nutrients">
                      <p>Calories &nbsp;: &nbsp;130 kcal</p>
                      <p>Carbohydrate&nbsp; : &nbsp;28.7 grams (g)</p>
                      <p>Protein &nbsp;: &nbsp;2.36 g</p>
                      <p>Fat&nbsp; :&nbsp; 0.19 g</p>
                    </div>
                    <div className="deliv-est">
                      <p className="delivery-est">Delivery Estimation :</p>
                      <p className="delivery-days">
                        {" "}
                        Within the next{" "}
                        <strong className="text-green">
                          &nbsp;&nbsp;30&nbsp;&nbsp;
                        </strong>{" "}
                        Minutes
                      </p>
                    </div>
                  </div>
                  <div className="price-and-qty">
                    <div className="pandq">
                      <div>
                        <span className="price mr-5 border border-cta px-5 py-2">
                          ${(item.price * item.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex">
                        <span
                          className="minus"
                          onClick={() => removeItem(item.id)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.amount} &nbsp;&nbsp;</span>
                        <span className="plus" onClick={() => addItem({...item, quantity:1}) }>
                          <AiOutlinePlus />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* bg-ctatransparent */}

        {items.length >= 1 && (
          <div className="order-summary">
            <h3 className="title">Order Summary</h3>
            <div className="qty flex">
              <p>Quantity: &nbsp;&nbsp; </p>
              <span>{items.length} &nbsp;&nbsp; Product(s)</span>
            </div>
            <div className="subtotal flex">
              <p>Sub Total : &nbsp;&nbsp;</p>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div>
              {/* <Link to="foodDetails/:foodId/showCart/checkoutPayement"> */}
              <button className="btn" type="button" onClick={handleCheckout}>
                Process to Checkout
              </button>
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCart;
