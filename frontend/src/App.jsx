import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitIssue from "./pages/SubmitIssue";
import TrackComplaints from "./pages/TrackComplaints";
import Search from "./pages/Search";
import Notices from "./pages/Notices";
import Departments from "./pages/Departments";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitIssue />} />
        <Route path="/track" element={<TrackComplaints />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;