/**import React, { useState } from "react";
import AddImage from "./components/AddImage";
import FeatureList from "./components/FeatureList";
import FeatureDetails from "./components/FeatureDetails";

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="container">
      <h1>Eye Detection Dashboard</h1>

      <AddImage />

      <hr />

      {selectedFeature ? (
        <FeatureDetails
          data={selectedFeature}
          onBack={() => setSelectedFeature(null)}
        />
      ) : (
        <FeatureList onSelect={(item) => setSelectedFeature(item)} />
      )}
    </div>
  );
}

export default App;*/

// In your main App component
import React, { useState } from "react";
import AddImage from "./components/AddImage";
import FeatureList from "./components/FeatureList";
import FeatureDetails from "./components/FeatureDetails";

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    // This triggers FeatureList to refresh
    setRefreshKey(prev => prev + 1);
  };

  if (selectedFeature) {
    return (
      <div className="container">
        <FeatureDetails 
          data={selectedFeature} 
          onBack={() => setSelectedFeature(null)} 
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Eye Detection Dashboard</h1>
      <AddImage onUploadSuccess={handleUploadSuccess} />
      <FeatureList 
        onSelect={setSelectedFeature} 
        refreshTrigger={refreshKey}
      />
    </div>
  );
}

export default App;

