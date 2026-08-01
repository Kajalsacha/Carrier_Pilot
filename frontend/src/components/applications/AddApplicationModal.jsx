import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { addApplication } from "../../services/applicationService";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

function AddApplicationModal({ fetchApplications }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("role", role);
      formData.append("status", status);

      if (resume) {
        formData.append("resume", resume);
      }

      await addApplication(formData);

      await fetchApplications();

      toast.success("Application Added Successfully");

      setCompanyName("");
      setRole("");
      setStatus("Applied");
      setResume(null);

      setOpen(false);
    } catch (error) {
      toast.error("Failed to add application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus size={18} />
        Add Application
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Application">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Company name"
            type="text"
            placeholder="e.g. Google"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <Input
            label="Role"
            type="text"
            placeholder="e.g. Frontend Engineer"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1F2937]">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-[#E8EDF3] bg-white px-3.5 py-2.5 text-[15px] text-[#1F2937] outline-none transition focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
            >
              <option value="Applied">Applied</option>
              <option value="OA">OA</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1F2937]">
              Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full rounded-xl border border-[#E8EDF3] bg-white px-3.5 py-2.5 text-sm text-[#6B7280] outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[#F8FAFC] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#6B7280] hover:file:bg-[#E8EDF3]"
            />
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full">
            Save Application
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddApplicationModal;
