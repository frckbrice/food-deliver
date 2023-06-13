import React, { useEffect, useState, useRef } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import "./style.css";
import { getMeals, createMeal } from "./modules";
import { useLocalStorage } from "../../store/useLocalStorage";
import Card2 from "../UI/Card2";

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
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { setlsData } = useLocalStorage("displayList");

  // this (submit) make filter happen on every key stroke
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const [authenticated, setauthenticated] = useState(null);
  const { lsData } = useLocalStorage("authenticated");
  useEffect(() => {
    const loggedInUser = lsData;
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    } else {
      setauthenticated(!loggedInUser);
      return navigate("/login");
    }
    setlsData(meals);
  }, []);

  return (
    <>
      <div id="sidebar">
        <h1 className="root-h1">
          {" "}
          <span id="welcome">
            Welcome to Admin Dashboard for <br /> Food-App Project
          </span>
          <button
            onClick={() => {
              navigate("/");
            }}
            id="newh1"
          >
            HOME
          </button>
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              ref={inputRef}
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
            <button type="submit" id="new">
              New
            </button>
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
                    {meal.name ? (
                      <>{meal.name}</>
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
        <Card2>
          {" "}
          <Outlet />
        </Card2>
      </div>
    </>
  );
};

export default AdminRoot;
