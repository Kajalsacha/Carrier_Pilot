import { useEffect, useState } from "react";

import SearchBar from "../../components/applications/SearchBar";
import StatusFilter from "../../components/applications/StatusFilter";
import ApplicationTable from "../../components/applications/ApplicationTable";
import AddApplicationModal from "../../components/applications/AddApplicationModal";

import { getApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [searchCompany, status]);

  const fetchApplications = async () => {
    try {
      const data = await getApplications(
        searchCompany,
        status
      );

      setApplications(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Applications
          </h1>

          <p className="mt-2 text-[#8E8E8E]">
            Manage all your job applications.
          </p>

        </div>

        {/* Add Button */}

        <AddApplicationModal
          fetchApplications={fetchApplications}
        />

      </div>

      {/* Search & Filter */}

      <div className="mt-8 flex flex-col gap-4 md:flex-row">

        <SearchBar
          searchCompany={searchCompany}
          setSearchCompany={setSearchCompany}
        />

        <StatusFilter
          status={status}
          setStatus={setStatus}
        />

      </div>

      {/* Table */}

      <div className="mt-8">

        <ApplicationTable
          applications={applications}
          fetchApplications={fetchApplications}
        />

      </div>

    </div>
  );
}

export default Applications;