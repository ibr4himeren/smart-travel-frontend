const API_BASE_URL = "https://smart-travel-backend-production.up.railway.app";

export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  return response.json();
}

export async function getCountries() {
  const response = await fetch("http://localhost:8080/countries");
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
}

export async function createCountry(data) {
  const response = await fetch("http://localhost:8080/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });


  if (!response.ok) {
    throw new Error("Failed to create country");
  }

  return response.json();
}

export async function deleteCountry(id) {
  await fetch(`http://localhost:8080/countries/${id}`, {
    method: "DELETE",
  });
}

export async function getCities() {
  const res = await fetch("http://localhost:8080/cities");
  return res.json();
}

export async function createCity(countryId, data) {
  const res = await fetch(`http://localhost:8080/cities/${countryId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteCity(id) {
  const res = await fetch(`http://localhost:8080/cities/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete city");
}

export async function addFavorite(userId, cityId) {
  const res = await fetch("http://localhost:8080/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, cityId }),
  });

  if (!res.ok) throw new Error("Add favorite failed");
  return res.json();
}

export async function getUserFavorites(userId) {
  const res = await fetch(`http://localhost:8080/favorites/user/${userId}`);
  return res.json();
}

export async function deleteFavorite(id) {
  await fetch(`http://localhost:8080/favorites/${id}`, {
    method: "DELETE",
  });
}

export async function getWeather(cityName) {
  const res = await fetch(`http://localhost:8080/weather/${cityName}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}


export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}
