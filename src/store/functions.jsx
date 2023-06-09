// import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { useLocalStorage } from "./useLocalStorage";

export async function GetMeals(query) {
  console.log("in function module, getting data from localforage");
  useLocalStorage();
  await fakeNetwork(`GetMeals:${query}`);
 let { meals, setMeals } = useLocalStorage("meals", {});
  if (!meals) meals = [];
  if (query) {
    meals = matchSorter(meals, query, { keys: ["name"] });
  }
  const newMeals = meals.sort(sortBy("last", "createdAt"));
  return { newMeals, setMeals };
}

export async function CreateMeal() {
  
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let meal = { id, createdAt: Date.now() };
  let { meals, setMeals } = await GetMeals();
  meals.unshift(meal);
  setMeals(meals);
  return meal;
}

export async function GetMeal(id) {
  await fakeNetwork(`meal:${id}`);
  let { meals } = useLocalStorage("meals", {});
  let meal = meals.find((meal) => meal.id === id);
  return meal ?? null;
}

export async function UpdateMeal(id, updates) {
  await fakeNetwork();
 let { meals, setMeals } = useLocalStorage("meals", {});
  let meal = meals.find((meal) => meal.id === id);
  if (!meal) throw new Error("No meal found for", id);
  Object.assign(meal, updates);
  setMeals(meals);
  return meal;
}

export async function DeleteMeal(id) {
 let { meals, setMeals } = useLocalStorage("meals", {});
  let index = meals.findIndex((meal) => meal.id === id);
  if (index > -1) {
    meals.splice(index, 1);
    setMeals(meals);
    return true;
  }
  return false;
}

export function set(key, value) {
  console.log("in function module, successfull saving");
  return localStorage.setItem("key", JSON.stringify(value));
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
