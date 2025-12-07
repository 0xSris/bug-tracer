import { useEffect, useState } from "react";
import { startRecorder, stopRecorder, exportEvents, clearEvents } from "../utils/recorder";

export default function RecorderPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    startRecorder();
    setIsRecording(true);

    return () => {
      stopRecorder();
    };
  }, []);

  function handleExport() {
    const data = exportEvents();
    if (!data || data === "[]") {
      alert("No events to export!");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    if (confirm("Clear all recorded events?")) {
      clearEvents();
      setEventCount(0);
    }
  }

  function handleStop() {
    stopRecorder();
    setIsRecording(false);
  }

  function handleResume() {
    startRecorder();
    setIsRecording(true);
  }

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    color: "#111",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 120ms ease",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "transparent",
    color: "#22c55e",
    border: "2px solid #22c55e",
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#22c55e", marginBottom: "1rem" }}>🎥 Recorder</h2>
      <p style={{ color: "#ccc", marginBottom: "2rem" }}>
        {isRecording ? "✅ Recording..." : "⏹️ Stopped"}
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
        <p style={{ color: "#e5e5e5", marginBottom: "1.5rem" }}>
          All interactions are being recorded: clicks, text inputs, and scrolls.
        </p>

        <div style={{ marginBottom: "2rem" }}>
          {isRecording ? (
            <button onClick={handleStop} style={buttonStyle}>
              ⏹️ Stop Recording
            </button>
          ) : (
            <button onClick={handleResume} style={buttonStyle}>
              ▶️ Resume Recording
            </button>
          )}
          <button onClick={handleExport} style={secondaryButtonStyle}>
            📥 Export JSON
          </button>
          <button onClick={handleClear} style={secondaryButtonStyle}>
            🗑️ Clear Events
          </button>
        </div>
      </div>

      <div style={{ color: "#999", fontSize: "0.9rem" }}>
        <p>💡 Tip: Export your session JSON and go to the Replay page to visualize the recording.</p>
      </div>
    </div>
  );
}
