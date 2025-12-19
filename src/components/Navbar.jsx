import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        🌍 <span>Smart Travel</span>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/cities">Cities</Link>
            <Link to="/countries">Countries</Link>
            <Link to="/favorites">Favorites</Link>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
