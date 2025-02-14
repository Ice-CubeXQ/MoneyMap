import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data);
        } else {
          setError(data.error || "Ошибка при загрузке данных");
        }
      } catch (error) {
        setError("Ошибка при загрузке данных");
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardData && (
        <div>
          <p>{dashboardData.message}</p>
          <p>User ID: {dashboardData.userId}</p>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
