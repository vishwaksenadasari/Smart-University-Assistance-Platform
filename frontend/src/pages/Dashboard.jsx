import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate=useNavigate();

  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
        <h2>welcome to dashboard</h2>
    </div>
  );
}

export default Dashboard;