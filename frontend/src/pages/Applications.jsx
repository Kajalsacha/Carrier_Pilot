import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications");
        setApplications(response.data);
      } 
      
      catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchApplications();
  }, []);


  const handleDelete = async (id) => {
  try {
    await api.delete(`/applications/${id}`);

    alert("Application Deleted");

    window.location.reload();

  } catch (error) {
    console.log(error.response?.data);
  }
};



  const handleAddApplication = async () => {
  try {
    await api.post("/applications", {
      companyName,
      role,
      status,
    });
   



    alert("Application Added");
    window.location.reload();

  } catch (error) {
    console.log(error.response?.data);
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

<button onClick={handleAddApplication}>
  Add Application
</button>



      {applications.length === 0 ? (
        <p>No Applications Found</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{app.companyName}</h3>

            <p>Role: {app.role}</p>

            <p>Status: {app.status}</p>

            <button onClick={() => handleDelete(app._id)}> Delete </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;