import React, { useContext, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { getfoodInStock } from "../GetFoods";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { toast } from "react-hot-toast";
import classes from "./MealDetail.module.css";
import Favorite from "../../Admin/Favorite";
import Card from "../../UI/Card";
import Header from "../../Layout/Header";
import { useLocalStorage } from "../../../store/useLocalStorage";
import { foodInStock } from "../GetFoods";

const FoodDetail = (props) => {
  const navigate = useNavigate();
  const { foodId } = useParams();

  const { lsData } = useLocalStorage("displayList");

  const foodIdMeal = lsData
    ? getfoodInStock(lsData, foodId)
    : getfoodInStock(foodInStock, foodId);

    console.log(foodIdMeal)

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
            {foodIdMeal.avatar && (
              <img
                src={foodIdMeal.avatar}
                alt=""
                className={classes["food-image"]}
              />
            )}
          </div>
          <div className={classes["global-container"]}>
            <div className={classes["detail-of-food"]}>
              <div className={classes.title}>
                {foodIdMeal.name ? (
                  <h1 className="text-3xl">{foodIdMeal.name}</h1>
                ) : (
                  <i>No Name</i>
                )}{" "}
                <Favorite meal={foodIdMeal} />
              </div>
              <div className={classes.favorite}></div>
              <div className="flex gap-x-4 border-b">
                {foodIdMeal.price && (
                  <p className="ml-4">
                    <span style={{ fontSize: "25px" }}> Price: </span>
                    <span className={classes.price}>
                      {`${parseInt(foodIdMeal.price).toFixed(2)}`
                        .toString()
                        .indexOf(".") !== -1
                        ? `$${foodIdMeal.price.toFixed(2)}`
                        : `$${foodIdMeal.price.toFixed(2)}.00`}
                    </span>
                  </p>
                )}
              </div>
              <dir className={classes.moredetail}>
                {/* "w-144 border-b pb-1" */}
                <span>{foodIdMeal.nutrient}</span>
                <span className="text-xl w-144">Origin : </span>{" "}
                {foodIdMeal.description && (
                  <span>{foodIdMeal.description}.</span>
                )}{" "}
                <br />
                <span className="text-xl">Support: </span> <br />
                Energy :&nbsp;
                {foodIdMeal.nutrients.energy && (
                  <span>{foodIdMeal.nutrients.energy}</span>
                )}
                &nbsp;
                <br />
                Carbohydrate :&nbsp;
                {foodIdMeal.nutrients.carbohydrate && (
                  <span>{foodIdMeal.nutrients.carbohydrate}</span>
                )}
                <br />
                Proteine :&nbsp;
                {foodIdMeal.nutrients.proteine && (
                  <span>{foodIdMeal.nutrients.proteine}</span>
                )}
                <br />
                Fat:&nbsp;
                {foodIdMeal.nutrients.fat && (
                  <span>{foodIdMeal.nutrients.fat}</span>
                )}
                <br />
                Water:&nbsp;
                {foodIdMeal.nutrients.water && (
                  <span>{foodIdMeal.nutrients.water}</span>
                )}
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
