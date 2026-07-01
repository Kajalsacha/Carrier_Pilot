import { useEffect, useState } from "react";

import SearchBar from "../../components/applications/SearchBar";
import StatusFilter from "../../components/applications/StatusFilter";
import ApplicationTable from "../../components/applications/ApplicationTable";

import { getApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();

      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Applications
          </h1>

          <p className="mt-2 text-[#8E8E8E]">
            Manage and track all your job applications.
          </p>

        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <SearchBar />

        <StatusFilter />

      </div>

      <div className="mt-8">

        <ApplicationTable
          applications={applications}
        />

      </div>

    </div>
  );
}

export default Applications;