import { Form, useLoaderData } from "react-router-dom";
import { getMeal } from "./modules";
import Favorite from "./Favorite";

// for the sake of optimization. if there's no meal to load
export async function loader({ params }) {
  const meal = await getMeal(params.mealId);
  if (!meal) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { meal };
}

export default function Food() {
  const { meal } = useLoaderData();

  return (
    <div id="meal">
      <div>
        <img key={meal.avatar} src={meal.avatar || null} alt="" />
      </div>

      <div className="div-data">
        <dir>
          <h1>
            {meal.first ? <>{meal.first}</> : <i>No Food Name</i>}{" "}
            <Favorite meal={meal} />
          </h1>

          {<p>{meal.price}</p>}
          {meal.origin && <p>{meal.origin}</p>}
          {meal.nutrient && <p>{meal.nutrient}</p>}
          {meal.description && <p>{meal.description}</p>}
        </dir>
        <div className="div-edit-btn">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                window.open("exit", "Thanks !");
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
