// 🔥 TEK KAYNAK: Backend base URL
const API_BASE_URL = "https://smart-travel-backend-production.up.railway.app";

/* =========================
   AUTH
========================= */

export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Register failed");
  return response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

/* =========================
   COUNTRIES
========================= */

export async function getCountries() {
  const response = await fetch(`${API_BASE_URL}/countries`);
  if (!response.ok) throw new Error("Failed to fetch countries");
  return response.json();
}

export async function createCountry(data) {
  const response = await fetch(`${API_BASE_URL}/countries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create country");
  return response.json();
}

export async function deleteCountry(id) {
  const response = await fetch(`${API_BASE_URL}/countries/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete country");
}

/* =========================
   CITIES
========================= */

export async function getCities() {
  const response = await fetch(`${API_BASE_URL}/cities`);
  if (!response.ok) throw new Error("Failed to fetch cities");
  return response.json();
}

export async function createCity(countryId, data) {
  const response = await fetch(`${API_BASE_URL}/cities/${countryId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create city");
  return response.json();
}

export async function deleteCity(id) {
  const response = await fetch(`${API_BASE_URL}/cities/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete city");
}

/* =========================
   FAVORITES
========================= */

export async function addFavorite(userId, cityId) {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, cityId }),
  });

  if (!response.ok) throw new Error("Add favorite failed");
  return response.json();
}

export async function getUserFavorites(userId) {
  const response = await fetch(`${API_BASE_URL}/favorites/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

export async function deleteFavorite(id) {
  const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete favorite");
}

/* =========================
   WEATHER
========================= */

export async function getWeather(cityName) {
  const response = await fetch(`${API_BASE_URL}/weather/${cityName}`);
  if (!response.ok) throw new Error("Weather fetch failed");
  return response.json();
}
