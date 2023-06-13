import React, { useEffect } from "react";
import PropTypes from "react";
import {
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import "./style.css";
import { createMeal } from "./modules";

export async function action() {
  const meal = await createMeal();
  return redirect(`/Login/Adminpage/meals/${meal.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q"); // q is the id of the input field
  return { q };
}

const SideBar = ({ data }) => {
  const { q } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  // this (submit) make filter happen on every key stroke
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

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
              aria-label="Search meals"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
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
          {data.length ? (
            <ul>
              {data.map((value) => (
                <li key={value.id}>
                  <NavLink
                    to={`/Login/Adminpage/item/${value.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {value.name ? (
                      <>{value.name}</>
                    ) : (
                      <i>No Name for this element yet</i>
                    )}{" "}
                    {value.favorite && <span>★</span>}
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
    </>
  );
};

export default SideBar;
