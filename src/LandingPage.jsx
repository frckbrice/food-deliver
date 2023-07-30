import "./App.css";
import Header from "./components/Layout/Header";
import AvailableMeals from "./components/Meals/AvailableMeals";

function App() {
  return (
    <>
      <Header />
      <main>
        <AvailableMeals />
      </main>
    </>
  );
}

export default App;
