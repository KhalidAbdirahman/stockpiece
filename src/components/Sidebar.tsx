import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#222",
      color: "#fff",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0
    }}>
      <h2 style={{ color: "#61dafb", fontSize: "20px" }}>OpStocks</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "10px 0" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link to="/leaderboard" style={{ color: "#fff", textDecoration: "none" }}>Leaderboard</Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link to="/agenda-piece" style={{ color: "#fff", textDecoration: "none" }}>Agenda Piece</Link>
        </li>
        <li style={{ margin: "10px 0" }}>
          <Link to="/watchlist" style={{ color: "#fff", textDecoration: "none" }}>Watchlist</Link>
        </li>
      </ul>
    </div>
  );
}
