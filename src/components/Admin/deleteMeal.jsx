import { redirect } from "react-router-dom";
import { deleteMeal } from "./modules";

export async function action({ params }) {
  await deleteMeal(params.mealId);
  return redirect("/Adminpage");
}
