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
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;