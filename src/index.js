import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import FoodDetail from "./components/Meals/MealItem/MealDetail";
import { Toaster } from "react-hot-toast";
import CartProvider from "./store/CartProvider";
import ShowCart from "./components/Meals/MealItem/ShowCartDetail";
import CheckoutPayement from "./components/FomsValidation/CheckoutPayement";
import AdminPage, {
  loader as AdminLoadMeals,
  action as AdminCreateMeal,
} from "./components/Admin/AdminPage";
import SignIn from "./components/FomsValidation/Login/SignIn";
import SignUp from "./components/FomsValidation/Login/SignUp";
import Food, { loader as sampleFoodLoader } from "./components/Admin/Meal";
import Index from "./components/Admin/IndexRoute";
import EditMeal, {
  action as EditFoodAction,
} from "./components/Admin/editMeal";
import { action as deleteAction } from "./components/Admin/deleteMeal";
import { action as foodFavoriteAction } from "./components/Admin/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "foodDetails/:foodId",
    element: (
      <CartProvider>
        <Toaster />
        <FoodDetail />
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/foodDetail/ShowCart",
    element: (
      <CartProvider>
        <Toaster />
        <ShowCart />
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/foodDetail/ShowCart/PayementDetails",
    element: (
      <CartProvider>
        <Toaster />
        <CheckoutPayement />
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <Toaster />
        <SignIn />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/SignUp",
    element: (
      <>
        <Toaster />
        <SignUp />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/Login/Adminpage",
    element: (
      <CartProvider>
        <Toaster />
        <AdminPage />
      </CartProvider>
    ),
    loader: AdminLoadMeals,
    action: AdminCreateMeal,
    errorElement: <ErrorPage />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/Login/Adminpage/meals/:mealId",
            element: <Food />,
            loader: sampleFoodLoader,
            // this action is for the fetcher to make gain of time from network delays.
            action: foodFavoriteAction,
          },
          {
            path: "/Login/Adminpage/meals/:mealId/edit",
            element: <EditMeal />,
            loader: sampleFoodLoader,
            action: EditFoodAction,
          },
          {
            path: "/Login/Adminpage/meals/:mealId/destroy",
            action: deleteAction,
            errorElement: (
              <div>
                Oops! There was an error. <br />
                This meal can't be delete cause of network issues
              </div>
            ),
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
