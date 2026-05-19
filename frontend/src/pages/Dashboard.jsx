import Search from "./Search";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
        <h2>welcome to dashboard</h2>
        <h3 style={{textAlign:'center'}}><Link to='/search'><input style={{padding:'15px',width:'500px'}} placeholder="search..."></input></Link></h3>
        <div style={{display:'grid',border:'2px solid',textAlign:'center',borderRadius:'8px',margin:'20px'}}>
          <h3>Good Morning</h3>
          <p>You have 2 pending compliants and 3 new notices. Stay on the top of things</p>
          <span style={{display:'flex',justifyContent:"center"}}>
            <Link to='/complaints/create'><button style={{margin:'20px',padding:'20px'}}>Submit an Issue</button></Link>
            <Link to='/notices'><button style={{margin:'20px',padding:'20px'}}>View Notices</button></Link>
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Link to='/complaints'>
          <div style={{border:'2px solid',padding:'40px',textAlign:'center'}}>
            <p>Total Complaints</p>
          </div>
          </Link>
          <div style={{border:'2px solid',padding:'40px',textAlign:'center'}}>
            <p>Pending Issues</p>
          </div>
          <div style={{border:'2px solid',padding:'40px',textAlign:'center'}}>
            <p>Resolved Issues</p>
          </div>
          <Link to='/notices'>
          <div style={{border:'2px solid',padding:'40px',textAlign:'center'}}>
            <p>latest notices</p>
          </div>
          </Link>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
            <h3 style={{border:'2px solid',padding:'50px',width:'450px'}}>recent complaints <span><Link to='/complaints'>View All</Link></span></h3>
          </div>
          <div>
            <h3 style={{border:'2px solid',padding:'50px',width:'450px'}}>Latest Complaints <span><Link to='/notices'>see all</Link></span></h3>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;