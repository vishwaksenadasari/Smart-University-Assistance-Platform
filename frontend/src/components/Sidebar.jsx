import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-100 h-screen p-4">
      <ul className="space-y-3">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/submit">Submit Issue</Link></li>
        <li><Link to="/track">Track Complaints</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/notices">Notices</Link></li>
        <li><Link to="/departments">Departments</Link></li>
      </ul>
    </div>
  );
}