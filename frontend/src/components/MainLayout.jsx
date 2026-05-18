import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import '../styles/Dashboard.css'

function MainLayout(){
    return (
        <div className="admin-dashboard-container">
            <Sidebar />
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;