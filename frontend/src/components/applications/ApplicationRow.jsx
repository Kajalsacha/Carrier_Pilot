import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

function ApplicationRow({ application }) {
  return (
    <tr className="border-t border-[#2F2F2F] hover:bg-[#1A1A1A]">

      <td className="px-6 py-5 text-white">
        {application.companyName}
      </td>

      <td className="text-[#CCCCCC]">
        {application.role}
      </td>

      <td>

        <span className="rounded-full bg-[#2A2A2A] px-3 py-1 text-sm text-white">

          {application.status}

        </span>

      </td>

      <td className="text-[#AAAAAA]">
        {new Date(application.appliedDate).toLocaleDateString()}
      </td>

      <td>

        <button className="text-white">

          <Eye size={18} />

        </button>

      </td>

      <td>

        <div className="flex gap-3">

          <button>

            <Pencil
              size={18}
              className="text-[#BBBBBB]"
            />

          </button>

          <button>

            <Trash2
              size={18}
              className="text-red-400"
            />

          </button>

        </div>

      </td>

    </tr>
  );
}

export default ApplicationRow;