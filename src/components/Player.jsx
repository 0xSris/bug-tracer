import { useEffect, useState } from "react";

// Cursor component
function Cursor({ x, y }) {
  return (
    <div
      style={{
        position: "fixed",
        top: y + "px",
        left: x + "px",
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: "#22c55e",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "top 120ms ease-out, left 120ms ease-out",
      }}
    />
  );
}
function ClickRipple({ x, y }) {
  return (
    <div
      style={{
        position: "fixed",
        top: y + "px",
        left: x + "px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid #22c55e",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9998,
        animation: "ripple 0.4s ease-out forwards",
      }}
    />
  );
}

export default function Player({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(500); // 500ms per event
  const [ripples, setRipples] = useState([]);

  // Button style for neon-green devtool look
  const buttonStyle = {
    color: "#111",
    background: "#22c55e",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "1rem",
  };

  useEffect(() => {
    if (!events || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= events.length) {
          clearInterval(interval);
          return prev;
        }

        const e = events[nextIndex];

        // Cursor logic for click events
        if (e.type === "click") {
  setCursorPos({ x: e.x, y: e.y });

  // create a ripple
  setRipples((prev) => [...prev, { id: Date.now(), x: e.x, y: e.y }]);

  // remove ripple after animation
  setTimeout(() => {
    setRipples((prev) => prev.slice(1));
  }, 400);
}



        // Input autofill logic
        if (e.type === "input") {
          const el = document.querySelector(e.selector);
          if (el) el.value = e.value;
        }

        // Scroll logic
        if (e.type === "scroll") {
          window.scrollTo(0, e.scrollY);
        }

        return nextIndex;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [events, speed]);

  const currentEvent = events[currentIndex] || null;

  return (
    <>
      <Cursor x={cursorPos.x} y={cursorPos.y} />
      {ripples.map((r) => (
  <ClickRipple key={r.id} x={r.x} y={r.y} />
))}

      <div
  style={{
    padding: "1rem",
    border: "1px solid #22c55e",
    marginTop: "1rem",
    background: "#0d0d0d",
    borderRadius: "6px",
  }}
>

        <h3 style={{ color: "#22c55e" }}>Event Player</h3>

        {/* JSON display */}
        {currentEvent ? (
          <pre style={{ color: "#e5e5e5" }}>{JSON.stringify(currentEvent, null, 2)}</pre>
        ) : (
          <p style={{ color: "#e5e5e5" }}>No events to play</p>
        )}

        {/* Timeline slider */}
        <input
          type="range"
          min="0"
          max={events.length - 1 || 0}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          style={{ width: "100%", marginTop: "1rem" }}
        />

        {/* Playback speed buttons */}
        <div style={{ marginTop: "1rem" }}>
          <button style={buttonStyle} onClick={() => setSpeed(1000)}>0.5x</button>
          <button style={buttonStyle} onClick={() => setSpeed(500)}>1x</button>
          <button style={buttonStyle} onClick={() => setSpeed(250)}>2x</button>
        </div>
      </div>
    </>
  );
}
