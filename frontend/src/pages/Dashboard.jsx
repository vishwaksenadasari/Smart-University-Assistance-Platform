import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl mb-4">Welcome 👋</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card title="Submit Issue" onClick={() => nav("/submit")} />
            <Card title="Track Complaints" onClick={() => nav("/track")} />
            <Card title="Search Information" onClick={() => nav("/search")} />
            <Card title="View Notices" onClick={() => nav("/notices")} />
            <Card title="Departments" onClick={() => nav("/departments")} />
          </div>
        </div>
      </div>
    </div>
  );
}