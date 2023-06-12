import { redirect } from "react-router-dom";
import { deleteMeal } from "./modules";
import "./style.css";

export async function action({ params }) {
  await deleteMeal(params.mealId);
  return redirect("/Login/Adminpage");
}
