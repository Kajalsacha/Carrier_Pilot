import ApplicationRow from "./ApplicationRow";

function ApplicationTable({ applications }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2F2F2F]">

      <table className="w-full">

        <thead className="bg-[#1A1A1A]">

          <tr>

            <th className="px-6 py-4 text-left text-[#A0A0A0]">
              Company
            </th>

            <th className="text-left text-[#A0A0A0]">
              Role
            </th>

            <th className="text-left text-[#A0A0A0]">
              Status
            </th>

            <th className="text-left text-[#A0A0A0]">
              Applied
            </th>

            <th className="text-left text-[#A0A0A0]">
              Resume
            </th>

            <th className="text-left text-[#A0A0A0]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="py-16 text-center text-[#777]"
              >
                No Applications Found
              </td>

            </tr>

          ) : (

            applications.map((application) => (

              <ApplicationRow
                key={application._id}
                application={application}
              />

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ApplicationTable;