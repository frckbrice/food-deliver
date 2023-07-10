import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useLocalStorage } from "../../store/useLocalStorage";
import { foodInStock } from "./GetFoods";

const AvailableMeals = () => {
  const { lsData } = useLocalStorage("displayList");
  let mealsList = [];
lsData ? mealsList = lsData?.map((meal) => (
    <MealItem
      key={meal.id}
      avatar={meal.avatar}
      name={meal.name}
      price={meal.price}
      id={meal.id}
    />
  )) : mealsList = foodInStock?.map((meal) => (
    <MealItem
      key={meal.id}
      avatar={meal.pict}
      name={meal.name}
      price={meal.price}
      id={meal.id}
    />
  ))
   

  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
