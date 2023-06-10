import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { foodInStock } from "./GetFoods";

const AvailableMeals = () => {
  const mealsList = foodInStock.map((meal) => (
    <MealItem
      key={meal.id}
      pict={meal.pict}
      name={meal.name}
      price={meal.price}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
