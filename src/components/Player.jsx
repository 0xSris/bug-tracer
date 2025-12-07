import { useEffect, useState } from "react";

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
        boxShadow: "0 0 8px rgba(34,197,94,0.6)",
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
  const [speed, setSpeed] = useState(500);
  const [ripples, setRipples] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const buttonStyle = {
    color: "#111",
    background: "#22c55e",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    fontWeight: "600",
    transition: "all 120ms ease",
  };

  const buttonDisabled = {
    ...buttonStyle,
    background: "#555",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  const validateEvent = (event) => {
    if (!event || typeof event !== "object") return false;
    if (!event.type || !event.timestamp) return false;
    if (event.type === "click" && (typeof event.x !== "number" || typeof event.y !== "number")) return false;
    return true;
  };

  useEffect(() => {
    if (!events || events.length === 0) {
      setError(null);
      return;
    }

    // Validate all events
    const invalidCount = events.filter(e => !validateEvent(e)).length;
    if (invalidCount > 0) {
      setError(`Warning: ${invalidCount} invalid event(s) detected`);
    } else {
      setError(null);
    }
  }, [events]);

  useEffect(() => {
    if (!isPlaying || !events || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        
        if (nextIndex >= events.length) {
          setIsPlaying(false);
          return prev;
        }

        const event = events[nextIndex];
        if (!validateEvent(event)) return nextIndex;

        if (event.type === "click" && typeof event.x === "number" && typeof event.y === "number") {
          setCursorPos({ x: event.x, y: event.y });
          setRipples((prev) => [...prev, { id: Date.now(), x: event.x, y: event.y }]);
        }

        if (event.type === "input" && event.selector) {
          const el = document.querySelector(event.selector);
          if (el && event.value !== undefined) el.value = event.value;
        }

        if (event.type === "scroll" && typeof event.scrollY === "number") {
          window.scrollTo(0, event.scrollY);
        }

        return nextIndex;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [events, speed, isPlaying]);

  // Clean up ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!events || events.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          border: "1px solid #22c55e",
          marginTop: "1rem",
          background: "#0d0d0d",
          borderRadius: "6px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#e5e5e5" }}>No events to play</p>
      </div>
    );
  }

  const currentEvent = events[currentIndex] || null;
  const progress = ((currentIndex + 1) / events.length) * 100;

  return (
    <>
      <Cursor x={cursorPos.x} y={cursorPos.y} />
      {ripples.map((r) => (
        <ClickRipple key={r.id} x={r.x} y={r.y} />
      ))}

      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #22c55e",
          marginTop: "1rem",
          background: "#0d0d0d",
          borderRadius: "6px",
        }}
      >
        <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>Event Player</h3>

        {error && (
          <div style={{ color: "#ff6b6b", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        {/* Event Info */}
        {currentEvent ? (
          <pre
            style={{
              color: "#e5e5e5",
              background: "#111",
              padding: "1rem",
              borderRadius: "4px",
              maxHeight: "200px",
              overflow: "auto",
              fontSize: "0.85rem",
            }}
          >
            {JSON.stringify(currentEvent, null, 2)}
          </pre>
        ) : null}

        {/* Progress bar */}
        <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "#232323",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#22c55e",
                transition: "width 120ms ease",
              }}
            />
          </div>
          <div style={{ color: "#999", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            {currentIndex + 1} / {events.length}
          </div>
        </div>

        {/* Timeline slider */}
        <input
          type="range"
          min="0"
          max={events.length - 1 || 0}
          value={currentIndex}
          onChange={(e) => {
            setCurrentIndex(Number(e.target.value));
            setIsPlaying(false);
          }}
          style={{
            width: "100%",
            cursor: "pointer",
            accentColor: "#22c55e",
          }}
          aria-label="Timeline scrubber"
        />

        {/* Controls */}
        <div style={{ marginTop: "1.5rem" }}>
          <button
            style={isPlaying ? buttonDisabled : buttonStyle}
            onClick={() => {
              setIsPlaying(true);
              setCurrentIndex(0);
            }}
            disabled={isPlaying}
            aria-label="Play"
          >
            ▶ Play
          </button>
          <button
            style={!isPlaying ? buttonDisabled : buttonStyle}
            onClick={() => setIsPlaying(false)}
            disabled={!isPlaying}
            aria-label="Pause"
          >
            ⏸ Pause
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              setCurrentIndex(0);
              setIsPlaying(false);
            }}
            aria-label="Reset"
          >
            ↻ Reset
          </button>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Speed:{" "}
              <button
                style={{
                  ...buttonStyle,
                  background: speed === 1000 ? "#22c55e" : "transparent",
                  border: "1px solid #22c55e",
                }}
                onClick={() => setSpeed(1000)}
              >
                0.5x
              </button>
              <button
                style={{
                  ...buttonStyle,
                  background: speed === 500 ? "#22c55e" : "transparent",
                  border: "1px solid #22c55e",
                }}
                onClick={() => setSpeed(500)}
              >
                1x
              </button>
              <button
                style={{
                  ...buttonStyle,
                  background: speed === 250 ? "#22c55e" : "transparent",
                  border: "1px solid #22c55e",
                }}
                onClick={() => setSpeed(250)}
              >
                2x
              </button>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
