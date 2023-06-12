import { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

import CartProvider from "./store/CartProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <Toaster />

      <Header />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
