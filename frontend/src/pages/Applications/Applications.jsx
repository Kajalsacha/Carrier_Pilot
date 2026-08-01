import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SearchBar from "../../components/applications/SearchBar";
import StatusFilter from "../../components/applications/StatusFilter";
import ApplicationTable from "../../components/applications/ApplicationTable";
import AddApplicationModal from "../../components/applications/AddApplicationModal";

import { getApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [searchCompany, status]);

  const fetchApplications = async () => {
    try {
      const data = await getApplications(searchCompany, status);

      setApplications(data);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937]">
            Applications
          </h1>

          <p className="mt-1.5 text-[#9CA3AF]">
            Manage all your job applications.
          </p>
        </div>

        {/* Add Button */}

        <AddApplicationModal fetchApplications={fetchApplications} />

      </div>

      {/* Search & Filter */}

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <SearchBar
          searchCompany={searchCompany}
          setSearchCompany={setSearchCompany}
        />

        <StatusFilter status={status} setStatus={setStatus} />
      </div>

      {/* Table */}

      <div className="mt-6">
        <ApplicationTable
          applications={applications}
          fetchApplications={fetchApplications}
          isLoading={isLoading}
        />
      </div>

    </div>
  );
}

export default Applications;
