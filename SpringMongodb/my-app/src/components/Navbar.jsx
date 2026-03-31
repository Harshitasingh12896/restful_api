import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">

      <h1>Student App</h1>

      <div className="flex gap-4">

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Add</Link>
        <Link to="/students">Students</Link>

        <button onClick={handleLogout}>Logout</button>

      </div>

    </div>
  );
}

export default Navbar;