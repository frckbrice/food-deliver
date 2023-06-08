import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getMeals(query) {
  await fakeNetwork(`getMeals:${query}`);
  let meals = await localforage.getItem("meals");
  if (!meals) meals = [];
  if (query) {
    meals = matchSorter(meals, query, { keys: ["first", "last"] });
  }
  return meals.sort(sortBy("last", "createdAt"));
}

export async function createMeal() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let meal = { id, createdAt: Date.now() };
  let meals = await getMeals();
  meals.unshift(meal);
  await set(meals);
  return meal;
}

export async function getMeal(id) {
  await fakeNetwork(`meal:${id}`);
  let meals = await localforage.getItem("meals");
  let meal = meals.find((meal) => meal.id === id);
  return meal ?? null;
}

export async function updateMeal(id, updates) {
  await fakeNetwork();
  let meals = await localforage.getItem("meals");
  let meal = meals.find((meal) => meal.id === id);
  if (!meal) throw new Error("No meal found for", id);
  Object.assign(meal, updates);
  await set(meals);
  return meal;
}

export async function deleteMeal(id) {
  let meals = await localforage.getItem("meals");
  let index = meals.findIndex((meal) => meal.id === id);
  if (index > -1) {
    meals.splice(index, 1);
    await set(meals);
    return true;
  }
  return false;
}

function set(meals) {
  return localforage.setItem("meals", meals);
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
