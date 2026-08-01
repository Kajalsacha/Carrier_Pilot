import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import StatCard from "../../components/dashboard/StatCard";
import ApplicationStatusChart from "../../components/dashboard/ApplicationStatusChart";
import MonthlyApplicationsChart from "../../components/analytics/MonthlyApplicationsChart";
import ApplicationTable from "../../components/applications/ApplicationTable";
import AddApplicationModal from "../../components/applications/AddApplicationModal";
import GenerateRoadmapModal from "../../components/roadmaps/GenerateRoadmapModal";
import { Skeleton } from "../../components/common/Loader";

import { getAnalytics } from "../../services/analyticsService";
import { getApplications } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";

const RECENT_APPLICATIONS_LIMIT = 5;

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalApplications: 0,
    applied: 0,
    oa: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsData, applicationsData] = await Promise.all([
        getAnalytics(),
        getApplications(),
      ]);

      setStats(analyticsData);
      setApplications(applicationsData);
    } catch (error) {
      toast.error("Failed to load dashboard analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const percentOf = (value) =>
    stats.totalApplications
      ? `${Math.round((value / stats.totalApplications) * 100)}%`
      : "0%";

  // Real "added this month" counts, derived from the applications already
  // fetched above — no extra API call needed.
  const now = new Date();
  const thisMonthApplications = applications.filter((app) => {
    const appliedDate = new Date(app.appliedDate);
    return (
      appliedDate.getMonth() === now.getMonth() &&
      appliedDate.getFullYear() === now.getFullYear()
    );
  });
  const thisMonthCount = (status) =>
    status
      ? thisMonthApplications.filter((app) => app.status === status).length
      : thisMonthApplications.length;

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      subtitle: "All time",
      trend: thisMonthCount(),
    },
    {
      title: "Applied",
      value: stats.applied,
      subtitle: percentOf(stats.applied),
      trend: thisMonthCount("Applied"),
    },
    {
      title: "Online Assessment",
      value: stats.oa,
      subtitle: percentOf(stats.oa),
      trend: thisMonthCount("OA"),
    },
    {
      title: "Interview",
      value: stats.interview,
      subtitle: percentOf(stats.interview),
      trend: thisMonthCount("Interview"),
    },
    {
      title: "Offer",
      value: stats.offer,
      subtitle: percentOf(stats.offer),
      trend: thisMonthCount("Offer"),
    },
    {
      title: "Rejected",
      value: stats.rejected,
      subtitle: percentOf(stats.rejected),
      trend: thisMonthCount("Rejected"),
    },
  ];

  const recentApplications = applications.slice(0, RECENT_APPLICATIONS_LIMIT);

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937]">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </h1>

          <p className="mt-1.5 text-[#6B7280]">
            Track your career journey and land your dream role.
          </p>
        </div>

        {/* Quick Actions */}

        <div className="flex flex-wrap gap-3">
          <AddApplicationModal fetchApplications={fetchDashboardData} />
          <GenerateRoadmapModal fetchRoadmaps={() => {}} />
        </div>
      </div>

      {/* Stat Cards */}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-31 rounded-2xl" />
            ))
          : statCards.map((card) => <StatCard key={card.title} {...card} />)}
      </div>

      {/* Charts */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </>
        ) : (
          <>
            <ApplicationStatusChart stats={stats} />
            <MonthlyApplicationsChart applications={applications} />
          </>
        )}
      </div>

      {/* Recent Applications */}

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1F2937]">Recent Applications</h2>

          <Link
            to="/applications"
            className="text-sm font-medium text-[#23364D] hover:text-[#1A2838]"
          >
            View All
          </Link>
        </div>

        <ApplicationTable
          applications={recentApplications}
          fetchApplications={fetchDashboardData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Dashboard;
