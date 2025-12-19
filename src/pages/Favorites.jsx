import { useEffect, useState } from "react";
import { getUserFavorites, deleteFavorite } from "../api/api";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setFavorites(await getUserFavorites(user.id));
  };

  const handleDelete = async (id) => {
    await deleteFavorite(id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="page">
      <h2>⭐ My Favorite Cities</h2>

      <div className="grid">
        {favorites.map(f => (
          <div key={f.id} className="card">
            {f.city.imageUrl && (
              <img src={f.city.imageUrl} alt={f.city.name} />
            )}

            <h3>{f.city.name}</h3>
            <p><b>Country:</b> {f.city.country.name}</p>
            <p>{f.city.description}</p>

            <div className="actions">
              <button onClick={() => handleDelete(f.id)}>❌ Remove</button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
