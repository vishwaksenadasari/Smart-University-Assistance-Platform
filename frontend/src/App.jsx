import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";

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
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import ManageComplaints from "./pages/ManageComplaints";
import ManageNotices from "./pages/ManageNotices";
import LandingPage from "./pages/LandingPage";
import ManageAccount from "./pages/ManageAccount";
import Account from "./pages/Account";
import Feedback from "./pages/Feedback";

function App() {
  const token=localStorage.getItem('token');
  return (
    <>
    <Router>
      <Routes>

        <Route path='/' element={token ? <Navigate to='/student/dashboard' /> : <Navigate to='/landing-page' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<VerifyOtp />}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/landing-page" element={<LandingPage />} />
        
        <Route path='/student' element={<PrivateRoute requiredRole='student'><MainLayout /></PrivateRoute>} >
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='departments' element={<Departments />} />
          <Route path='complaints/create' element={<CreateComplaints />} />
          <Route path='complaints' element={<TrackComplaints />} />
          <Route path="notices" element={<ViewNotices />} />
          <Route path="search" element={<Search />} />
          <Route path="account" element={<Account />} />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path='feedback' element={<Feedback />} />
        </Route>

        {/* Admin Group with Persistent Sidebar */}
        <Route path="/admin" element={<PrivateRoute requiredRole='staff'><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path='search' element={<Search />} />
          <Route path="complaints" element={<ManageComplaints />} />
          <Route path="notices" element={<ManageNotices />} />
          <Route path="notices/create" element={<CreateNotices />} />
          <Route path='account' element={<Account />} />
          <Route path='manage-account' element={<ManageAccount />} />
          <Route path='feedback' element={<Feedback />} />
        </Route>
        </Routes>
    </Router>
    <Toaster  position="top-right"/>
    </>
  );
}

export default App;