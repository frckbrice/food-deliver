import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { getfoodInStock } from "../GetFoods";
import MealItemForm from "./MealItemForm";
import Header from "../../Layout/Header";
import CartContext from "../../../store/cart-context";
import { toast } from "react-hot-toast";

const FoodDetail = (props) => {
  const { foodId } = useParams();
  const foodIdMeal = getfoodInStock(foodId);
  console.log("in foodDetail file", foodIdMeal);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      id: foodIdMeal.id,
      name: foodIdMeal.name,
      quantity: quantity,
      price: foodIdMeal.price,
      pict: foodIdMeal.pict,
    });
    toast(`Adding ${quantity} ${foodIdMeal.name} in the cart`);
  };

  return (
    <div className="food-details">
      <Header />

      {/* <FoodDescription food = {food} /> */}
      <div className="div-image">
        <img src={foodIdMeal.pict} alt="" className="food-image" />
      </div>
      <div className="global-container">
        <div className="detail-of-food ">
          <h2>{foodIdMeal.name}</h2>
          <div>
            <span>{foodIdMeal.favorite && <span>stars</span>}</span>
          </div>
          <div className="flex gap-x-4 border-b">
            {foodIdMeal.description && <p>Price: </p>}

            <p>
              <span>
                {`${foodIdMeal.price.toFixed(2)}`.toString().indexOf(".") !== -1
                  ? `$${foodIdMeal.price.toFixed(2)}`
                  : `$${foodIdMeal.price.toFixed(2)}.00`}
              </span>
            </p>
          </div>
          <dir className="w-144 border-b pb-6">
            <h3 className="text-3xl">More details: </h3>
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Explicabo excepturi quo corporis odio aliquid
            </span>
          </dir>
        </div>
        <div className="quantity-description">
          <div className="flex gap-x-4 my-6">
            <h4> Quantity: </h4>

            <MealItemForm
              id={foodIdMeal.id}
              onAddToCart={addToCartHandler}
              price={foodIdMeal.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FoodDetail.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  favorite: PropTypes.bool,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
  currency: PropTypes.string,
};

export default FoodDetail;
