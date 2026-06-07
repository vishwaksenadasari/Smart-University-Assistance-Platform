import '../styles/Sidebar.css'
import {Link,useLocation,useNavigate} from 'react-router-dom'

function Sidebar(){
    const navigate=useNavigate();
    const location=useLocation();
    const mainItems=[
        {
            name:'Dashboard',
            path:'/student/dashboard'
        },
        {
            name:'Search',
            path:'/student/search'
        },
        {
            name:'Submit Issue',
            path:'/student/complaints/create'
        },
        {
            name:'View Issues',
            path:'/student/complaints'
        },
        {
            name:'View Notices',
            path:'/student/notices'
        },
        {
            name:'Departments',
            path:'/student/departments'
        }
    ];
    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    function manageAccount(){
        navigate('/student/account');
    }
    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h1>Student<span>Panel</span></h1>
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
                <button onClick={manageAccount} className='logout-btn' style={{color:'blue'}}>My Account</button>
            </div>
        </div>
    );
}

export default Sidebar;