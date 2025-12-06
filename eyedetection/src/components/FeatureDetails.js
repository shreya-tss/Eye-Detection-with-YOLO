function FeatureDetails({ data, onBack }) {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>Feature Details</h2>

      {data.features.map((feat, idx) => (
        <div key={idx} style={{ marginBottom: "15px" }}>
          <p><b>Eye {idx + 1}</b></p>
          <p>Brightness: {feat.brightness.toFixed(2)}</p>
          <p>Openness: {feat.openness.toFixed(2)}</p>
          <p>Area: {feat.area}</p>
          <p>Symmetry: {feat.symmetry.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureDetails;
