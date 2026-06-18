import { useRef } from "react";
function ApplicationCard({
  app,
  handleDelete,
  handleUpdateStatus,
  handleReplaceResume,
}){


  const fileInputRef = useRef(null);

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>{app.companyName}</h3>

      <p>Role: {app.role}</p>

      <p>Status: {app.status}</p>
      
     <button
  onClick={() => {

    const url =
      `http://localhost:5000/uploads/${app.resume}`;

    console.log("URL:", url);
    console.log("Resume:", app.resume);

    window.open(url, "_blank");
  }}
>
  View Resume
</button>

      <select
        defaultValue={app.status}
        onChange={(e) =>
          handleUpdateStatus(
            app._id,
            e.target.value
          )
        }
      >
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <br />
      <br />


      <button
  onClick={() =>
    fileInputRef.current.click()
  }
>
  Replace Resume
</button>

<input
  type="file"
  style={{ display: "none" }}
  ref={fileInputRef}
  onChange={(e) =>
    handleReplaceResume(
      app._id,
      e.target.files[0]
    )
  }
/>

      <button
        onClick={() => handleDelete(app._id)}
      >
        Delete
      </button>
      
    </div>
  );
}

export default ApplicationCard;