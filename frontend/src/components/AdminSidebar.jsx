import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import ManageAccount from "../pages/ManageAccount";

function AdminSidebar(){
    const location=useLocation();
    const navigate = useNavigate();
    const menuItems=[
        {
            name:'Dashboard',
            path:'/admin/dashboard'
        },
        {
            name:'Search',
            path:'/admin/search'
        },
        {
            name:'Manage Complaints',
            path:'/admin/complaints'
        },
        {
            name:'Manage Notices',
            path:'/admin/notices'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const manageAccount = ()=>{
        navigate('/admin/account');
    }

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h1>Admin<span>Panel</span></h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item,index)=>(
                        <li key={index}>
                            <Link to={item.path} 
                            className={location.pathname === item.path ? 'active' : ''}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button 
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Sign Out
                </button>
                <button onClick={manageAccount} className="logout-btn" style={{color:'blue'}}>My Account</button>
            </div>
        </div>
    );
}

export default AdminSidebar;