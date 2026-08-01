import { Inbox } from "lucide-react";
import ApplicationRow from "./ApplicationRow";
import Card from "../common/Card";
import { Skeleton } from "../common/Loader";
import EmptyState from "../common/EmptyState";

const COLUMNS = ["Company", "Role", "Status", "Applied", "Actions"];

function ApplicationTable({ applications, fetchApplications, isLoading }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC]">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8EDF3]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {COLUMNS.map((column) => (
                    <td key={column} className="px-6 py-5">
                      <Skeleton className="h-4 w-full max-w-24" />
                    </td>
                  ))}
                </tr>
              ))
            ) : applications.length > 0 ? (
              applications.map((application) => (
                <ApplicationRow
                  key={application._id}
                  application={application}
                  fetchApplications={fetchApplications}
                />
              ))
            ) : (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <EmptyState
                    icon={Inbox}
                    title="No applications found"
                    description="Add your first application to start tracking it here."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ApplicationTable;
