import React, { useContext, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { getfoodInStock } from "../GetFoods";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { toast } from "react-hot-toast";
import classes from "./MealDetail.module.css";
import HeaderFoodDetail from "./HeaderFoodDetail";
import Favorite from "./Favorite";

const FoodDetail = (props) => {
  const { foodId } = useParams();
  const foodIdMeal = getfoodInStock(foodId);
  // console.log("in foodDetail file", foodIdMeal);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = useCallback(
    (quantity) => {
      cartCtx.addItem({
        id: foodIdMeal.id,
        name: foodIdMeal.name,
        quantity: quantity,
        price: foodIdMeal.price,
        pict: foodIdMeal.pict,
      });
      toast(`Adding ${quantity} ${foodIdMeal.name} in the cart`);
    },
    [foodIdMeal.id, foodIdMeal.name, foodIdMeal.price, foodIdMeal.pict, cartCtx]
  );

  return (
    <div className={classes["food-details"]}>
      <HeaderFoodDetail />

      <div className={classes["div-image"]}>
        <img src={foodIdMeal.pict} alt="" className={classes["food-image"]} />
      </div>
      <div className={classes["global-container"]}>
        <div className={classes["detail-of-food"]}>
          <h1>
            {foodIdMeal.name ? <>{foodIdMeal.name}</> : <i>No Name</i>}{" "}
            <Favorite food={foodIdMeal} />
          </h1>
          <div>
            <span>{foodIdMeal.favorite && <span>stars</span>}</span>
          </div>
          <div className="flex gap-x-4 border-b">
            {foodIdMeal.price && (
              <p>
                Price:{" "}
                <span>
                  {`${foodIdMeal.price.toFixed(2)}`.toString().indexOf(".") !==
                  -1
                    ? `$${foodIdMeal.price.toFixed(2)}`
                    : `$${foodIdMeal.price.toFixed(2)}.00`}
                </span>
              </p>
            )}
          </div>
          <dir className="w-144 border-b pb-6">
            <h3 className="text-3xl">More details: </h3>
            <span>Energy:&nbsp;&nbsp; ${foodIdMeal.nutrients.energy}</span>
            <span>
              <br />
              Carbohydrate: &nbsp;&nbsp; ${foodIdMeal.nutrients.carbohydrate}
            </span>
            <br />
            <span>Protein: &nbsp;&nbsp; ${foodIdMeal.nutrients.proteine}</span>
            <br />
            <span>Fat: &nbsp;&nbsp; ${foodIdMeal.nutrients.fat}</span>
            <br />
            <span>Water: &nbsp;&nbsp; ${foodIdMeal.nutrients.water}</span>
            <br />
          </dir>
        </div>
        <div className="div-mealItemForm">
          <MealItemForm
            id={foodIdMeal.id}
            onAddToCart={addToCartHandler}
            price={foodIdMeal.price}
          />
          <div className={classes["price-btn"]}>
            <Link to="/">
              <button className={classes["go-back"]}>
                {" "}
                <span></span>Go Back
              </button>
            </Link>
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

export default React.memo(FoodDetail);
