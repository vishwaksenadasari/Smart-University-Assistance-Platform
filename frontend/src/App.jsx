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
import Search from "./pages/Search";
import VerifyOtp from "./pages/verifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassowrd";
import MainLayout from "./components/MainLayout";

function App() {
  const token=localStorage.getItem('token');
  return (
    <Router>
      <Routes>

        <Route path='/' element={token ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<VerifyOtp />}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path='/' element={<PrivateRoute><MainLayout /></PrivateRoute>} >
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='departments' element={<Departments />} />
          <Route path='complaints/create' element={<CreateComplaints />} />
          <Route path='complaints' element={<TrackComplaints />} />
          <Route path="notices" element={<ViewNotices />} />
          <Route path="notices/create" element={<CreateNotices />} />
          <Route path="search" element={<Search />} />
        </Route>
        </Routes>
    </Router>
  );
}

export default App;