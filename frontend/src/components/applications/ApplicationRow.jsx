import { Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { deleteApplication, updateStatus } from "../../services/applicationService";
import { API_BASE_URL } from "../../services/api";
import { STATUS_STYLES } from "../common/Badge";
import ActionMenu from "../common/ActionMenu";

import ATSAnalysisModal from "./ATSAnalysisModal";

const LOGO_COLORS = [
  { bg: "#DBEAFE", text: "#1D4ED8" },
  { bg: "#DCFCE7", text: "#15803D" },
  { bg: "#FEF3C7", text: "#B45309" },
  { bg: "#FCE7F3", text: "#BE185D" },
  { bg: "#EDE9FE", text: "#6D28D9" },
  { bg: "#E0F2FE", text: "#0369A1" },
];

function getLogoColors(name) {
  const index = (name?.charCodeAt(0) || 0) % LOGO_COLORS.length;
  return LOGO_COLORS[index];
}

function ApplicationRow({ application, fetchApplications }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await deleteApplication(application._id);

      toast.success("Application Deleted Successfully");

      fetchApplications();
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await updateStatus(application._id, newStatus);

      toast.success("Status Updated Successfully");

      fetchApplications();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleViewResume = () => {
    if (!application.resume) {
      toast.error("Resume not available");
      return;
    }

    window.open(`${API_BASE_URL}/uploads/${application.resume}`, "_blank");
  };

  const logoColors = getLogoColors(application.companyName);

  return (
    <tr className="hover:bg-[#F8FAFC]">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-sm font-semibold"
            style={{ backgroundColor: logoColors.bg, color: logoColors.text }}
          >
            {application.companyName?.[0]?.toUpperCase()}
          </span>

          <span className="font-medium text-[#1F2937]">
            {application.companyName}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-[#6B7280]">{application.role}</td>

      <td className="px-6 py-4">
        <select
          value={application.status}
          onChange={handleStatusChange}
          className={`rounded-full border px-3 py-1 text-sm font-medium outline-none transition ${
            STATUS_STYLES[application.status] || "bg-[#F8FAFC] text-[#6B7280] border-[#E8EDF3]"
          }`}
        >
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>

      <td className="px-6 py-4 text-[#9CA3AF]">
        {format(new Date(application.appliedDate), "d MMM yyyy")}
      </td>

      <td className="px-6 py-4">
        <ActionMenu>
          <button
            onClick={handleViewResume}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#6B7280] hover:bg-[#F8FAFC]"
          >
            <Eye size={16} />
            View Resume
          </button>

          <ATSAnalysisModal application={application} />

          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </ActionMenu>
      </td>
    </tr>
  );
}

export default ApplicationRow;
