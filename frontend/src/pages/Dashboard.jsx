import {useNavigate, Link} from "react-router-dom";
function Dashboard() {
  const navigate=useNavigate();

  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
        <h2>welcome to dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
          <nav>
            <ul>
              <li><Link to='/departments'>Go to departments</Link></li>
              <li><Link to='/complaints/create'>Register Complaint</Link></li>
              <li><Link to='/complaints'>View Complaints</Link></li>
              <li><Link to='/notices'>View Notices</Link></li>
              <li><Link to='/notices/create'>Create Notices</Link></li>
              <li><Link to='/search'>Search Information</Link></li>
            </ul>
          </nav>
    </div>
  );
}

export default Dashboard;