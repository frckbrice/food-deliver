import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useLocalStorage } from "../../store/useLocalStorage";
import { foodInStock } from "./GetFoods";

const AvailableMeals = () => {
  const { lsData } = useLocalStorage("displayList");
  let mealsList = [];
  lsData
    ? (mealsList = lsData?.map((meal) => (
        <MealItem
          key={meal.id}
          avatar={meal.avatar}
          name={meal.name}
          price={meal.price}
          id={meal.id}
        />
      )))
    : (mealsList = foodInStock?.map((meal) => (
        <MealItem
          key={meal.id}
          avatar={meal.avatar}
          name={meal.name}
          price={meal.price}
          id={meal.id}
        />
      )));

  return (
    <section className={classes.meals}>
      <h2
        className={classes.menu}
        style={{
          textAlign: "center",
          color: "#7cf34d",
          fontSize: "5vw",
          marginBottom: "12px",
        }}
      >
        MENU
      </h2>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
