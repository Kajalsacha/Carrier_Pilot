import ApplicationRow from "./ApplicationRow";

function ApplicationTable({
  applications,
  fetchApplications,
  onStatusUpdated,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2F2F2F] bg-[#181818]">
      <table className="w-full">
        {/* Table Header */}
        <thead className="bg-[#202020]">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-semibold text-[#BBBBBB]">
              Company
            </th>

            <th className="text-left text-sm font-semibold text-[#BBBBBB]">
              Role
            </th>

            <th className="text-left text-sm font-semibold text-[#BBBBBB]">
              Status
            </th>

            <th className="text-left text-sm font-semibold text-[#BBBBBB]">
              Applied
            </th>

            <th className="text-center text-sm font-semibold text-[#BBBBBB]">
              Resume
            </th>

            <th className="text-center text-sm font-semibold text-[#BBBBBB]">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <ApplicationRow
                key={application._id}
                application={application}
                fetchApplications={fetchApplications}
                onStatusUpdated={onStatusUpdated}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-16 text-center text-[#777777]"
              >
                No Applications Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;