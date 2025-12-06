/*import React, {useState} from "react"; 
import { uploadImage } from "../api";
import { encodeImageToBase64 } from "../utils/encodeImage";

function AddImage(){
    const[file, setFile]=useState(null); 
    const [status, setStatus]=useState("");
    const handleUpload=async()=>{
        if(!file){
            alert("Please select a file"); 
            return; 
        }
         setStatus("Uploading..."); 
         const base64=await encodeImageToBase64(file);
         const response=await uploadImage(base64); 
         setStatus(`Saved ${response.saved_count} features`);
    }; 

    return(
        <div>
            <h2> Add Image</h2>
            <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
            <button onClick={handleUpload}>Upload</button>
            <p>{status}</p>
        </div>
    ); 
}

export default AddImage; */

/*import React, { useState } from "react";
import { uploadImage } from "../api";
import { encodeImageToBase64 } from "../utils/encodeImage";

function AddImage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setStatus("Uploading...");
      const base64 = await encodeImageToBase64(file);

      // Call backend API
      const response = await uploadImage(base64);

      if (response.status === "success") {
        setStatus(`Saved ${response.saved_count} features`);
      } else {
        setStatus(`Error: ${response.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("Upload failed. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Add Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
}

export default AddImage;*/




import React, { useState } from "react";
import { uploadImage } from "../api";
import { encodeImageToBase64 } from "../utils/encodeImage";

function AddImage({ onUploadSuccess }) {  // Add callback prop
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    setStatus("Uploading...");
    setError(null);

    try {
      const base64 = await encodeImageToBase64(file);
      const response = await uploadImage(base64);
      
      if (response && response.status === "success") {
        setStatus(`Success! Saved ${response.saved_count || 0} features`);
        
        // Clear the file input
        setFile(null);
        
        // Notify parent component to refresh FeatureList
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        throw new Error(response?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(`Upload failed: ${err.message}`);
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setStatus("");
    }
  };

  return (
    <div>
      <h2>Add Image</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={loading}
      />
      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      
      <p>{status}</p>
      
      {file && (
        <div>
          <p>Selected: {file.name}</p>
        </div>
      )}
    </div>
  );
}

export default AddImage;