import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useLocalStorage } from "../../store/useLocalStorage";

const AvailableMeals = () => {
  const { lsData } = useLocalStorage("displayList");

  const mealsList = lsData.map((meal) => (
    <MealItem
      key={meal.id}
      avatar={meal.avatar}
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
