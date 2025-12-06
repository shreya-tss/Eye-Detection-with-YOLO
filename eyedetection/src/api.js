/*const API_BASE="http://localhost:5000";//Flask Backend

export const uploadImage=async(imageBase64)=>{
    const res=await fetch(`${API_BASE}/upload`,{
        method:"POST", 
        headers:{"Content-Type":"application/json"}, 
        body:JSON.stringify({image:imageBase64}), 
    }); 
    return res.json(); 
}

export const fetchFeatures=async()=>{
    const res=await fetch(`${API_BASE}/features`); 
    return res.json(); 

}*/
/*const API_BASE = "http://127.0.0.1:5000";

export const uploadImage = async (imageBase64) => {
  try {
    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageBase64 }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

export const fetchFeatures = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/upload`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Fetch features failed:", err);
    throw err;
  }
};
*/


const API_BASE = "http://127.0.0.1:5000";

export const uploadImage = async (imageBase64) => {
  return fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageBase64 }),
  }).then(res => res.json());
};

export const fetchFeatures = async () => {
  return fetch(`${API_BASE}/api/features`).then(res => res.json());
};
