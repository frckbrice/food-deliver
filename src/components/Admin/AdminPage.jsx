import React, { useEffect, useState, useContext } from "react";
import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./style.css";
import { getMeals, createMeal } from "./modules";
import { useLocalStorage } from "../../store/useLocalStorage";
import Card2 from "../UI/Card2";
import SideBar from "./sideBar";
// import useAuthContext from "../../store/useAuthContext";

export async function action() {
  const meal = await createMeal();
  return redirect(`/Login/Adminpage/item/${meal.id}/edit`);
}

export async function loader({ request }) {
  const meals = await getMeals();
  return { meals };
}

const AdminRoot = () => {
  const { meals } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { lsData, setlsData } = useLocalStorage("displayList");

  //* this is to check logged user through localstorage
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const loggedInUser = lsData;
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    } else {
      setauthenticated(!loggedInUser);
      return navigate("/login");
    }
    setlsData(meals);
  }, [meals, lsData, navigate, setlsData]);

  //*this to check logged user through context Api.
  // const user = useAuthContext();
  // if (!user) {
  //   return <Navigate replace to="/login" />;
  // }

  return (
    <>
      <SideBar data={meals} />
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
