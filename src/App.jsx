import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1 className="logo">bug-tracer</h1>
          <p className="tagline">
            Tiny session recorder & visual replay for debugging — record clicks,
            inputs and scrolls, then replay them with a neon cursor.
          </p>
        </div>

        <nav className="nav">
          <Link to="/record" className="btn primary">Recorder</Link>
          <Link to="/replay" className="btn outline">Replay</Link>
        </nav>
      </header>

      <main className="features">
        <section className="card">
          <h2 className="card-title">What it does</h2>
          <ul className="feature-list">
            <li>Records clicks (with coordinates), text inputs and scrolling</li>
            <li>Exports a compact JSON session you can share or save</li>
            <li>Replays visually: neon cursor, ripple on click, input autofill</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="card-title">Quick start</h2>
          <ol className="feature-list">
            <li>Open <strong>Recorder</strong>, interact with the page</li>
            <li>Export the JSON session</li>
            <li>Open <strong>Replay</strong>, import the JSON and watch</li>
          </ol>
        </section>
      </main>

      <footer className="app-footer">
        <small>Made with ♥ · MIT license · 2025</small>
      </footer>
    </div>
  );
}
