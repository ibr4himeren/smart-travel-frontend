import { useEffect, useState } from "react";
import { getCountries, createCountry, deleteCountry } from "../api/api";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [continent, setContinent] = useState("");

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    setCountries(await getCountries());
  };

  const handleAdd = async () => {
    if (!name.trim()) return alert("Country name required");
    await createCountry({ name, continent });
    setName("");
    setContinent("");
    loadCountries();
  };

  return (
    <div className="page">
      <h2>🌎 Countries</h2>

      <div className="form-box">
        <input placeholder="Country name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Continent" value={continent} onChange={e => setContinent(e.target.value)} />
        <button onClick={handleAdd}>Add Country</button>
      </div>

      <div className="grid">
        {countries.map(c => (
          <div className="card" key={c.id}>
            <h3>{c.name}</h3>
            <p>{c.continent}</p>
            <button onClick={() => deleteCountry(c.id)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
