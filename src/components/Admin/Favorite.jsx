import React from "react";
import { useFetcher } from "react-router-dom";
import { updateMeal } from "./modules";
import "./style.css";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateMeal(params.mealId, {
    favorite: formData.get("favorite") === "true",
  });
}

const Favorite = ({ meal }) => {
  // useFetcher hook. It allows us to communicate with loaders and actions without causing a navigation.
  const fetcher = useFetcher();

  let favorite = meal.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};

export default Favorite;
