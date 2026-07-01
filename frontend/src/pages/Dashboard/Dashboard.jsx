import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import ApplicationStatusChart from "../../components/dashboard/ApplicationStatusChart";
import { getAnalytics } from "../../services/analyticsService";

function Dashboard() {


const [stats, setStats] = useState({
  totalApplications: 0,
  applied: 0,
  oa: 0,
  interview: 0,
  offer: 0,
  rejected: 0,
});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(stats);

  return (
    <div>

      <h1 className="text-4xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-2 text-[#888888]">
        Here's an overview of your applications.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

       <StatCard
  title="Total Applications"
  value={stats.totalApplications}
/>

<StatCard
  title="Applied"
  value={stats.applied}
/>

<StatCard
  title="Online Assessment"
  value={stats.oa}
/>

<StatCard
  title="Interview"
  value={stats.interview}
/>

<StatCard
  title="Offer"
  value={stats.offer}
/>

<StatCard
  title="Rejected"
  value={stats.rejected}
/>

      </div>


      <ApplicationStatusChart stats={stats} />

    </div>
  );
}

export default Dashboard;