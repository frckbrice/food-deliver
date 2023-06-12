import React, { useContext, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { getfoodInStock } from "../GetFoods";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { toast } from "react-hot-toast";
import classes from "./MealDetail.module.css";
import Favorite from "./Favorite";
import Card from "../../UI/Card";
import Header from "../../Layout/Header";
import { useLocalStorage } from "../../../store/useLocalStorage";

const FoodDetail = (props) => {
  const navigate = useNavigate();
  const { foodId } = useParams();

  const { lsData } = useLocalStorage("displayList");

  const foodIdMeal = getfoodInStock(lsData, foodId);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = useCallback(
    (quantity) => {
      cartCtx.addItem({
        id: foodIdMeal.id,
        name: foodIdMeal.name,
        quantity: quantity,
        price: foodIdMeal.price,
        avatar: foodIdMeal.avatar,
      });
      toast(`Adding ${quantity} ${foodIdMeal.name} in the cart`);
    },
    [
      foodIdMeal.name,
      foodIdMeal.id,
      foodIdMeal.price,
      foodIdMeal.avatar,
      cartCtx,
    ]
  );

  return (
    <>
      <Header />
      <div className={classes["food-details"]}>
        <Card>
          <div className={classes["div-image"]}>
            <img
              src={foodIdMeal.avatar}
              alt=""
              className={classes["food-image"]}
            />
          </div>
          <div className={classes["global-container"]}>
            <div className={classes["detail-of-food"]}>
              <div className={classes.title}>
                {foodIdMeal.name ? (
                  <h1 className="text-3xl">{foodIdMeal.name}</h1>
                ) : (
                  <i>No Name</i>
                )}{" "}
                <Favorite food={foodIdMeal} />
              </div>
              <div className={classes.favorite}></div>
              <div className="flex gap-x-4 border-b">
                {foodIdMeal.price && (
                  <p>
                    Price:{" "}
                    <span className={classes.price}>
                      {`${parseInt(foodIdMeal.price).toFixed(2)}`
                        .toString()
                        .indexOf(".") !== -1
                        ? `$${parseInt(foodIdMeal.price).toFixed(2)}`
                        : `$${parseInt(foodIdMeal.price).toFixed(2)}.00`}
                    </span>
                  </p>
                )}
              </div>
              <dir className="w-144 border-b pb-1">
                <h3 className="text-3xl">More details: </h3>
                <span>{foodIdMeal.nutrient}</span>
                <br />
              </dir>
            </div>
            <div className={classes["div-mealItemForm"]}>
              <MealItemForm
                id={foodIdMeal.id}
                onAddToCart={addToCartHandler}
                price={foodIdMeal.price}
              />
              <div className={classes["price-btn"]}>
                <button
                  className={classes["go-back"]}
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  <span></span>Go Back
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
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

export default memo(FoodDetail);
