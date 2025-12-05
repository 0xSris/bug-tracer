// utils/recorder.js

const MAX_EVENTS = 100; // max events to keep
let events = []; // ring buffer
function getSelector(el) {
  if (!el) return null;

  // 1. ID is the strongest
  if (el.id) return `#${el.id}`;

  // 2. Reasonable class selectors
  if (el.className && typeof el.className === "string") {
    const clean = el.className.trim().replace(/\s+/g, ".");
    if (clean.length > 0) return `.${clean}`;
  }

  // 3. Tag + nth-child fallback
  const tag = el.tagName.toLowerCase();
  const parent = el.parentElement;

  if (!parent) return tag;

  const children = Array.from(parent.children);
  const index = children.indexOf(el) + 1;

  return `${tag}:nth-child(${index})`;
}

function addEvent(event) {
  if (events.length >= MAX_EVENTS) {
    events.shift(); // remove oldest
  }
  events.push(event);
}

// Listen for clicks
export function startRecorder() {
  document.addEventListener("click", (e) => {
  addEvent({
    type: "click",
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now(),
    tagName: e.target.tagName,
  });
});

  // Listen for input changes (record element selector + value)
document.addEventListener("input", (e) => {
  addEvent({
    type: "input",
    selector: e.target.id || e.target.className || e.target.tagName,
    value: e.target.value,
    timestamp: Date.now(),
  });
});


  // Listen for scrolls
  window.addEventListener("scroll", () => {
    addEvent({
      type: "scroll",
      scrollY: window.scrollY,
      timestamp: Date.now(),
    });
  });
}

// Export current events as JSON
export function exportEvents() {
  return JSON.stringify(events, null, 2);
}

// Reset recorded events
export function clearEvents() {
  events = [];
}
