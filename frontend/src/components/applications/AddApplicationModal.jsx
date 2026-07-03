import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { addApplication } from "../../services/applicationService";

function AddApplicationModal({ fetchApplications }) {
  const [open, setOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("1. Submit Started");

    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("role", role);
    formData.append("status", status);

    if (resume) {
      formData.append("resume", resume);
    }

    console.log("2. FormData Ready");

    const response = await addApplication(formData);

    console.log("3. API Success", response);

    await fetchApplications();

    console.log("4. Table Refreshed");

    toast.success("Application Added Successfully");

    setCompanyName("");
    setRole("");
    setStatus("Applied");
    setResume(null);

    setOpen(false);

  } catch (error) {
    console.log("ERROR:", error);
    toast.error("Failed to add application");
  }
};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-white px-5 py-3 font-medium text-black hover:bg-gray-200"
      >
        + Add Application
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="w-full max-w-xl rounded-2xl border border-[#2F2F2F] bg-[#181818] p-8">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Add Application
              </h2>

              <button onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                className="w-full rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] p-4 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] p-4 text-white outline-none"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] p-4 text-white outline-none"
              >
                <option value="Applied">Applied</option>
                <option value="OA">OA</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
                className="w-full rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] p-4 text-white"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-white py-4 font-semibold text-black hover:bg-gray-200"
              >
                Save Application
              </button>

            </form>

          </div>

        </div>
      )}
    </>
  );
}

export default AddApplicationModal;