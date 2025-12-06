import { useState } from "react";
import Player from "../components/Player";

export default function ReplayPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) {
          throw new Error("Expected JSON array of events");
        }
        setEvents(json);
      } catch (err) {
        setError(`Invalid JSON: ${err.message}`);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
      setLoading(false);
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
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ color: "#22c55e", marginBottom: "0.5rem" }}>
          ▶️ Replay Session
        </h2>
        <p style={{ color: "#ccc", marginBottom: "2rem" }}>
          Import a session JSON file to replay events visually.
        </p>

        <div
          style={{
            background: "#0d0d0d",
            border: "1px solid #22c55e",
            padding: "2rem",
            borderRadius: "6px",
            marginBottom: "2rem",
          }}
        >
          <label
            style={{
              display: "inline-block",
              padding: "1rem 1.5rem",
              background: "#22c55e",
              color: "#111",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 120ms ease",
            }}
          >
            📂 Choose File
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={loading}
              style={{ display: "none" }}
              aria-label="Import session file"
            />
          </label>

          {loading && (
            <p style={{ marginTop: "1rem", color: "#22c55e" }}>Loading...</p>
          )}

          {error && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#4a1a1a",
                border: "1px solid #ff6b6b",
                borderRadius: "4px",
                color: "#ff6b6b",
              }}
            >
              {error}
            </div>
          )}

          {events.length > 0 && (
            <p style={{ marginTop: "1rem", color: "#22c55e" }}>
              ✅ Loaded {events.length} event(s)
            </p>
          )}
        </div>

        {events.length > 0 && <Player events={events} />}
      </div>
    </div>
  );
}
