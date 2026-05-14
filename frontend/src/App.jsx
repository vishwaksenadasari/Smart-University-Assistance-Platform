import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments"
import PrivateRoute from "./components/PrivateRoute";
import CreateComplaints from "./pages/CreateComplaints";
import TrackComplaints from "./pages/TrackComplaints";
import ViewNotices from "./pages/ViewNotices";
import CreateNotices from "./pages/CreateNotices";

function App() {
  const token=localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path='/' element={token ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/departments' element={<PrivateRoute><Departments /></PrivateRoute>} />
        <Route path='/complaints/create' element={<PrivateRoute><CreateComplaints /></PrivateRoute>} />
        <Route path='/complaints' element={<PrivateRoute><TrackComplaints /></PrivateRoute>} />
        <Route path="/notices" element={<PrivateRoute><ViewNotices /></PrivateRoute>} />
        <Route path="/notices/create" element={<PrivateRoute><CreateNotices /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;