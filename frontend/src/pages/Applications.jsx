import { useEffect, useState } from "react";
import api from "../services/api";
import ApplicationCard from "../components/ApplicationCard";


function Applications() {
  const [searchCompany, setSearchCompany] = useState("");
  const [applications, setApplications] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filterStatus, setFilterStatus] = useState("");
  const [resume, setResume] = useState(null);

 

  useEffect(() => {
    const fetchApplications = async () => {
      
      try {
      const response = await api.get(`/applications?company=${searchCompany}&status=${filterStatus}`);
        setApplications(response.data);
      } 
      
      catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchApplications(); 
  }, [searchCompany,filterStatus]);


  const handleDelete = async (id) => {
  try {
    await api.delete(`/applications/${id}`);

    alert("Application Deleted");

   setApplications(
  applications.filter(
    (app) => app._id !== id
  )
);

  } catch (error) {
    console.log(error.response?.data);
  }
};



  const handleAddApplication = async () => {
  try {
   const formData = new FormData();

formData.append(
  "companyName",
  companyName
);

formData.append(
  "role",
  role
);

formData.append(
  "status",
  status
);

if (resume) {
  formData.append(
    "resume",
    resume
  );
}

const response = await api.post(
  "/applications",
  formData
);


setApplications([response.data, ...applications,]);
   



    alert("Application Added");
 

  } catch (error) {
    console.log(error.response?.data);
  }
};


const handleUpdateStatus = async (
  id,
  status
) => {
  try {
    await api.put(`/applications/${id}`, {
      status,
    });

    alert("Status Updated");

    setApplications( applications.map((app) => app._id === id? { ...app, status }: app));

  } catch (error) {
    console.log(error.response?.data);
  }
};

const handleReplaceResume = async (
  id,
  file
) => {
  try {

    const formData = new FormData();

    formData.append(
      "resume",
      file
    );

    const response = await api.put(
      `/applications/${id}/resume`,
      formData
    );

    setApplications(
      applications.map((app) =>
        app._id === id
          ? response.data.application
          : app
      )
    );

    alert(
      response.data.message
    );

  } catch (error) {
    console.log(
      error.response?.data
    );
  }
};


return (
  <div>
    <h1>Applications</h1>

    <h2>Add Application</h2>

    <input
      type="text"
      placeholder="Company Name"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
    />

    <br /><br />

    <input
      type="text"
      placeholder="Role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    />

    <br /><br />

   <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option>Applied</option>
  <option>OA</option>
  <option>Interview</option>
  <option>Rejected</option>
  <option>Offer</option>
</select>

<br /><br />

<input
  type="file"
  onChange={(e) =>
    setResume(e.target.files[0])
  }
/>

    <br /><br />

   <button onClick={handleAddApplication}>
  Add Application
</button>

<br />
<br />

<input
  type="text"
  placeholder="Search Company"
  value={searchCompany}
  onChange={(e) =>
    setSearchCompany(e.target.value)
  }
/>

<br />
<br />

<select
  value={filterStatus}
  onChange={(e) =>
    setFilterStatus(e.target.value)
  }
>
  <option value="">
    All Status
  </option>

  <option value="Applied">
    Applied
  </option>

  <option value="OA">
    OA
  </option>

  <option value="Interview">
    Interview
  </option>

  <option value="Rejected">
    Rejected
  </option>

  <option value="Offer">
    Offer
  </option>
</select>

<br />
<br />
    {applications.length === 0 ? (<p>No Applications Found</p>) :
    
    (
      applications.map((app) => (
       <ApplicationCard
  key={app._id}
  app={app}
  handleDelete={handleDelete}
  handleUpdateStatus={handleUpdateStatus}
  handleReplaceResume={handleReplaceResume}
/>
      ))
    )}
  </div>
);
}

export default Applications;