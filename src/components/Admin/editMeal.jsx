import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateMeal } from "./modules";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateMeal(params.mealId, updates);
  return redirect(`/Adminpage/meals/${params.mealId}`);
}

const EditMeal = () => {
  const { meal } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="meal-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={meal.first}
          className="input-name"
        />
      </p>
      <label>
        <span>Price</span>
        <input
          type="text"
          name="price"
          placeholder=" $"
          defaultValue={meal.price}
        />
      </label>
      <label>
        <span>Origin</span>
        <input
          type="text"
          name="origin"
          placeholder="origin of meal"
          defaultValue={meal.origin}
        />
      </label>
      <label>
        <span>Nutrient support</span>
        <textarea name="nutrient" defaultValue={meal.nutrient} rows={6} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={meal.avatar}
        />
      </label>
      <label>
        <span>Brieve Description</span>
        <textarea name="description" defaultValue={meal.description} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>

        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
};

export default EditMeal;
