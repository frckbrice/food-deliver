import React, { useEffect } from "react";
import {
  Outlet,
  // Link, // replaced by NavLink for the sake of hovering
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getMeals, createMeal } from "./modules";

export async function action() {
  const meal = await createMeal();
  return redirect(`/Login/Adminpage/meals/${meal.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q"); // q is the id of the input field
  const meals = await getMeals(q);
  return { meals, q };
}

const AdminRoot = () => {
  const { meals, q } = useLoaderData();
  const navigation = useNavigation();
  // this make filter happen on every key stroke
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1 className="root-h1">
          {" "}
          Welcome to Admin Dashboard for <br /> Food-App Project
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search meals"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                // theis event.currentTarget.form help submit the form (filtering) while typing.
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              className={searching ? "loading" : ""}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {meals.length ? (
            <ul>
              {meals.map((meal) => (
                <li key={meal.id}>
                  <NavLink
                    to={`/Login/Adminpage/meals/${meal.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {meal.first || meal.last ? (
                      <>
                        {meal.first} {meal.last}
                      </>
                    ) : (
                      <i>No Name for this meal yet</i>
                    )}{" "}
                    {meal.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No meals</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoot;
