// utils/recorder.js

const MAX_EVENTS = 100;
let events = [];
let isRecording = false;
let scrollTimeout;

function getSelector(el) {
  if (!el) return null;
  if (el.id) return `#${el.id}`;
  if (el.className && typeof el.className === "string") {
    const clean = el.className.trim().replace(/\s+/g, ".");
    if (clean.length > 0) return `.${clean}`;
  }
  const tag = el.tagName.toLowerCase();
  const parent = el.parentElement;
  if (!parent) return tag;
  const children = Array.from(parent.children);
  const index = children.indexOf(el) + 1;
  return `${tag}:nth-child(${index})`;
}

function addEvent(event) {
  if (!isRecording) return;
  if (events.length >= MAX_EVENTS) {
    events.shift();
  }
  events.push(event);
}

const clickHandler = (e) => {
  addEvent({
    type: "click",
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now(),
    tagName: e.target.tagName,
  });
};

const inputHandler = (e) => {
  addEvent({
    type: "input",
    selector: getSelector(e.target),
    value: e.target.value,
    timestamp: Date.now(),
  });
};

const scrollHandler = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    addEvent({
      type: "scroll",
      scrollY: window.scrollY,
      timestamp: Date.now(),
    });
  }, 150);
};

export function startRecorder() {
  if (isRecording) return;
  isRecording = true;
  events = [];

  document.addEventListener("click", clickHandler);
  document.addEventListener("input", inputHandler);
  window.addEventListener("scroll", scrollHandler);
}

export function stopRecorder() {
  isRecording = false;
  document.removeEventListener("click", clickHandler);
  document.removeEventListener("input", inputHandler);
  window.removeEventListener("scroll", scrollHandler);
  clearTimeout(scrollTimeout);
}

export function exportEvents() {
  return JSON.stringify(events, null, 2);
}

export function clearEvents() {
  events = [];
}

export function getEvents() {
  return events;
}
