import { Form, useLoaderData } from "react-router-dom";
import { getMeal } from "./modules";
import Favorite from "./Favorite";
import "./style.css";

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
        <div>
          <h1>
            {meal.name ? <span>{meal.name}</span> : <>No Food Name</>}
            <Favorite meal={meal} />
          </h1>

          {<p className="price text-green-500">${meal.price}</p>}

          {meal.nutrient && <p className="nutrient">{meal.nutrient}</p>}
          {meal.description && (
            <p className="description"> {meal.description}</p>
          )}
        </div>
        <div className="div-edit-btn">
          <Form action="edit">
            <button type="submit" className="btn">
              Edit
            </button>
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
            <button type="submit" className="btn">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
