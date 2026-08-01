import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

import { getAnalytics } from "../../services/analyticsService";
import { getApplications } from "../../services/applicationService";

import StatCard from "../../components/dashboard/StatCard";
import ApplicationStatusChart from "../../components/dashboard/ApplicationStatusChart";
import MonthlyApplicationsChart from "../../components/analytics/MonthlyApplicationsChart";
import InsightsList from "../../components/analytics/InsightsList";
import { Skeleton } from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

function Analytics() {
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsData, applicationsData] = await Promise.all([
        getAnalytics(),
        getApplications(),
      ]);

      setStats(analyticsData);
      setApplications(applicationsData);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const interviewRate = stats.totalApplications
    ? Math.round(((stats.interview + stats.offer) / stats.totalApplications) * 100)
    : 0;
  const offerRate = stats.totalApplications
    ? Math.round((stats.offer / stats.totalApplications) * 100)
    : 0;
  const rejectionRate = stats.totalApplications
    ? Math.round((stats.rejected / stats.totalApplications) * 100)
    : 0;

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-72" />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-31 rounded-2xl" />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937]">
        Analytics
      </h1>

      <p className="mt-1.5 text-[#9CA3AF]">
        Insights into your job search performance.
      </p>

      {stats.totalApplications === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="Not enough data yet"
          description="Add a few applications to start seeing your performance analytics here."
          actionLabel="Add Application"
          actionTo="/applications"
          className="mt-8"
        />
      ) : (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Applications" value={stats.totalApplications} />
            <StatCard title="Interview Rate" value={interviewRate} suffix="%" />
            <StatCard title="Offer Rate" value={offerRate} suffix="%" />
            <StatCard title="Rejection Rate" value={rejectionRate} suffix="%" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <MonthlyApplicationsChart applications={applications} />
            <ApplicationStatusChart stats={stats} />
          </div>

          <div className="mt-6">
            <InsightsList stats={stats} applications={applications} />
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;
