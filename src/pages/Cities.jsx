import { useEffect, useState } from "react";
import {
  getCities,
  createCity,
  deleteCity,
  getCountries,
  addFavorite,
  getWeather,
} from "../api/api";
import { useAuth } from "../context/AuthContext";

function Cities() {
  const { user } = useAuth();

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);


  const [form, setForm] = useState({
    name: "",
    population: "",
    description: "",
    countryId: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setCities(await getCities());
    setCountries(await getCountries());
  };

  const generateImageUrl = (cityName) => {
    return `https://picsum.photos/seed/${encodeURIComponent(
      cityName
    )}/600/400`;
  };

  const handleAdd = async () => {
    if (!form.countryId) {
      alert("Select a country");
      return;
    }

    if (!form.name.trim()) {
      alert("City name required");
      return;
    }

    const imageUrl = generateImageUrl(form.name);

    await createCity(form.countryId, {
      name: form.name,
      population: Number(form.population),
      description: form.description,
      imageUrl,
    });

    setForm({
      name: "",
      population: "",
      description: "",
      countryId: "",
    });

    load();
  };

  const showWeather = async (cityName) => {
    const data = await getWeather(cityName);
    setWeather({
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
    });
  };

  return (
    <div className="page">
      <h2>🏙 Cities</h2>

      {/* ADD CITY */}
      <div className="form-box">
        <select
          value={form.countryId}
          onChange={(e) =>
            setForm({ ...form, countryId: e.target.value })
          }
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="City name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Population"
          value={form.population}
          onChange={(e) =>
            setForm({ ...form, population: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={handleAdd}>Add City</button>
      </div>

      {/* CITY CARDS */}
      <div className="grid">
        {cities.map((city) => (
          <div className="card" key={city.id}>
            {city.imageUrl && (
              <img src={city.imageUrl} alt={city.name} />
            )}

            <h3>{city.name}</h3>
            <p>{city.description}</p>
            <small>{city.country.name}</small>

            <div className="actions">
              <button onClick={() => showWeather(city.name)}>
                🌤
              </button>

              <button
                onClick={async () => {
                  if (!user) {
                    alert("Login required");
                    return;
                  }
                  await addFavorite(user.id, city.id);
                  alert("Added to favorites ⭐");
                }}
              >
                ⭐
              </button>

              <button
                onClick={async () => {
                  await deleteCity(city.id);
                  setCities((prev) =>
                    prev.filter((c) => c.id !== city.id)
                  );
                }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WEATHER */}
      {weather && (
        <div className="weather-box">
          <h3>{weather.city}</h3>
          <p>{weather.temp} °C</p>
          <p>{weather.desc}</p>
        </div>
      )}
    </div>
  );
}

export default Cities;
