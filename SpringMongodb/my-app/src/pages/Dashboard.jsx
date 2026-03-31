import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4">

        <Link
          to="/add"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          ➕ Add Student
        </Link>

        <Link
          to="/students"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          📋 View Students
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;