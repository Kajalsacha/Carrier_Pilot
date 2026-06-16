import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/applications/stats");

        setStats(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>CareerPilot Dashboard 🚀</h1>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Application Statistics</h3>

      <p>Applied: {stats.Applied}</p>

      <p>OA: {stats.OA}</p>

      <p>Interview: {stats.Interview}</p>

      <p>Rejected: {stats.Rejected}</p>

      <p>Offer: {stats.Offer}</p>
    </div>
  );
}

export default Dashboard;