import "./App.css";
import Meals from "./components/Meals/Meals";
import Header from "./components/Layout/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
