import { useEffect } from "react";
import { startRecorder, exportEvents, clearEvents } from "../utils/recorder";

export default function RecorderPage() {
  useEffect(() => {
    startRecorder();
  }, []);

  function handleExport() {
    const data = exportEvents();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "session.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    clearEvents();
    alert("Events cleared!");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#22c55e" }}>Recorder Page</h2>
      <p>Recording clicks, scrolls, and inputs...</p>
      <button onClick={handleExport} style={{ marginRight: "1rem", color: "#111", background: "#22c55e", padding: "0.5rem 1rem", border: "none", cursor: "pointer" }}>Export JSON</button>
      <button onClick={handleClear} style={{ color: "#111", background: "#22c55e", padding: "0.5rem 1rem", border: "none", cursor: "pointer" }}>Clear Events</button>
    </div>
  );
}
