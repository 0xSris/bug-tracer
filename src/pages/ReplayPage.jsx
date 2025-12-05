import { useState } from "react";
import Player from "../components/Player";

export default function ReplayPage() {
  const [events, setEvents] = useState([]);

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setEvents(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  }

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        padding: "2rem",
        color: "#e5e5e5",
      }}
    >
      <h2 style={{ color: "#22c55e" }}>Replay Page</h2>

      <p style={{ marginBottom: "1rem" }}>
        Import a session JSON file to replay events visually.
      </p>

      <input
        type="file"
        onChange={handleImport}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          background: "#222",
          color: "#e5e5e5",
          border: "1px solid #22c55e",
          borderRadius: "4px",
        }}
      />

      <Player events={events} />
    </div>
  );
}
