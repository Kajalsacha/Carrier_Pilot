import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  deleteApplication,
  updateStatus,
} from "../../services/applicationService";






function ApplicationRow({
  application,
  fetchApplications,
}) {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {

      await deleteApplication(application._id);

      toast.success(
        "Application Deleted Successfully"
      );

      fetchApplications();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete application"
      );

    }

  };




  const handleStatusChange = async (e) => {
  const newStatus = e.target.value;

  try {
    await updateStatus(application._id, newStatus);

    toast.success("Status Updated Successfully");

    fetchApplications();
  } catch (error) {
    console.log(error);

    toast.error("Failed to update status");
  }
};



const getStatusStyle = (status) => {
  switch (status) {
    case "Applied":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

    case "OA":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";

    case "Interview":
      return "bg-purple-500/20 text-purple-400 border border-purple-500/30";

    case "Offer":
      return "bg-green-500/20 text-green-400 border border-green-500/30";

    case "Rejected":
      return "bg-red-500/20 text-red-400 border border-red-500/30";

    default:
      return "bg-[#2B2B2B] text-white";
  }
};



const handleViewResume = () => {
  if (!application.resume) {
    toast.error("Resume not available");
    return;
  }

  window.open(
    `http://localhost:5000/uploads/${application.resume}`,
    "_blank"
  );
};





  return (

    
    <tr className="border-t border-[#2F2F2F] hover:bg-[#1A1A1A]">

      <td className="px-6 py-5 font-medium text-white">
        {application.companyName}
      </td>

      
      
      <td className="text-[#CCCCCC]">
        {application.role}
      </td>

      
      
      <td>
        <select  value={application.status}  onChange={handleStatusChange}
       
       className={`rounded-full px-3 py-1 text-sm font-medium outline-none transition ${getStatusStyle(application.status)}`}>
    
    <option value="Applied">Applied</option>
    <option value="OA">OA</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  
  </select>

</td>

      
      
      <td className="text-[#AAAAAA]">
        {new Date(application.appliedDate).toLocaleDateString()}
      </td>

      
      
      <td>

        <button  onClick={handleViewResume} className="rounded-lg p-2 transition hover:bg-[#2A2A2A]">
  
               <Eye size={18} className="text-white"/>

        </button>

      </td>

      
      <td>

        <div className="flex gap-3">

        

          
          
          <button
            onClick={handleDelete}
          >

            
          <Trash2
              size={18}
              className="text-red-400 hover:text-red-500"
            />

          </button>

        </div>

      </td>

    </tr>

  );
}

export default ApplicationRow;