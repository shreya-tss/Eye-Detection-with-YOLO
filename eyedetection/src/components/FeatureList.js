/*import React, { useState, useEffect } from "react";
import { fetchFeatures } from "../api";

function FeatureList({ onSelect }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchFeatures();
      setFeatures(data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Stored Features</h2>

      {features.map((item, index) => (
        <div
          key={index}
          className="list-item"
          onClick={() => onSelect(item)}
        >
          <b>Document {index + 1}</b> – {item.features.length} eyes detected
        </div>
      ))}
    </div>
  );
}

export default FeatureList;*/


import React, { useState, useEffect } from "react";
import { fetchFeatures } from "../api";

function FeatureList({ onSelect, refreshTrigger }) {  // Add refreshTrigger prop
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFeatures();
      setFeatures(data || []);
    } catch (err) {
      console.error("Failed to fetch features:", err);
      setError("Failed to load features. Please check backend.");
      setFeatures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  if (loading) return <div>Loading features...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Stored Features</h2>
      
      <button onClick={loadFeatures} style={{ marginBottom: "10px" }}>
        Refresh
      </button>
      
      {features.length === 0 ? (
        <p>No features found. Upload an image first.</p>
      ) : (
        features.map((item, index) => (
          <div
            key={index}
            className="list-item"
            onClick={() => onSelect(item)}
          >
            <b>Document {index + 1}</b> – {item.features?.length || 0} eyes detected
          </div>
        ))
      )}
    </div>
  );
}

export default FeatureList;