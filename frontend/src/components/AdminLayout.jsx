import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../styles/Dashboard.css";

const AdminLayout = () => {
    return (
        <div className="admin-dashboard-container">
            <AdminSidebar />
            <main className="admin-main-content">
                {/* This is where the specific page content (Dashboard, Departments, etc.) will render */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;