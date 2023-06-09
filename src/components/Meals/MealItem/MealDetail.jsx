import React, { useContext, memo } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { getfoodInStock } from "../GetFoods";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { toast } from "react-hot-toast";
import classes from "./MealDetail.module.css";
import HeaderFoodDetail from "../../Layout/HeaderFoodDetail";
import Favorite from "./Favorite";
import Card2 from "../../UI/Card2";
import Card from "../../UI/Card";

const FoodDetail = (props) => {
  const navigate = useNavigate();
  const { foodId } = useParams();
  const foodIdMeal = getfoodInStock(foodId);
  // console.log("in foodDetail file", foodIdMeal);

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
    <div className={classes["food-details"]}>
      {/* <Link to={`/foodDetail/ShowCart`}> */}
      <HeaderFoodDetail />
      {/* </Link> */}
      <Card>
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
                    {`${foodIdMeal.price.toFixed(2)}`
                      .toString()
                      .indexOf(".") !== -1
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
              <span>
                Protein: &nbsp;&nbsp; ${foodIdMeal.nutrients.proteine}
              </span>
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
