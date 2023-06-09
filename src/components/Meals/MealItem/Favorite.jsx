import React from "react";
import { useFetcher } from "react-router-dom";
import { UpdateMeal } from "../../../store/functions";

export async function action({ request, params }) {
  console.log("request.formData in favorite");
  let formData = await request.formData();
  return UpdateMeal(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

const Favorite = ({ food }) => {
  const fetcher = useFetcher();

  let favorite = food.favorite;
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