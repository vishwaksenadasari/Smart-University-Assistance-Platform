import { useState } from "react";
import '../styles/Sidebar.css'
import {Link,useLocation,useNavigate} from 'react-router-dom'

function Sidebar(){
    const navigate=useNavigate();
    const location=useLocation();
    const mainItems=[
        {
            name:'Dashboard',
            path:'/dashboard'
        },
        {
            name:'Search',
            path:'/search'
        },
        {
            name:'Submit Issue',
            path:'/complaints/create'
        },
        {
            name:'View Issues',
            path:'/complaints'
        },
        {
            name:'View Notices',
            path:'/notices'
        },
        {
            name:'Departments',
            path:'/departments'
        }
    ];
    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h1>Student Panel</h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {mainItems.map((item,index)=>(
                        <li key={index}>
                            <Link to={item.path}
                            className={location.pathname===item.path ? 'active' : ''}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">Sign Out</button>
            </div>
        </div>
    );
}

export default Sidebar;