import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import FoodDetail from "./components/Meals/MealItem/MealDetail";
import { Toaster } from "react-hot-toast";
import CartProvider from "./store/CartProvider";

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
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);
