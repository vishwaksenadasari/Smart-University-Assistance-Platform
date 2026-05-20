import { useState,useEffect } from "react";
import api from '../api/axios';
import "../styles/Departments.css";

function Departments() {
  const [deps,setDeps]=useState([]);
  const [department,setDepartment]=useState('');
  const [error,setError]=useState('');
  useEffect(()=>{
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      };
      try{
        const {data}=await api.get('/departments',{params: {department_name : department}, headers});
        setDeps(data);
        setError('');
      }
      catch(err){
        setError(err.response?.data?.error || 'failed to fetch departments');
      }
    };

    fetchData();
  },[department]);

  const departmentsList = ['All', 'Examination', 'CSE', 'Library'];

  return (
    <div className="departments-page">
      <div className="departments-header">
        <h2 className="departments-title">Departments</h2>
        {error && <p className="departments-error">{error}</p>}
      </div>

      <div className="department-filters">
        {departmentsList.map(dep=>(
          <button key={dep} className={`filter-btn ${department === (dep === 'All' ? '' : dep) ? 'active' : ''}`}
            onClick={()=>setDepartment(dep==='All'?"":dep)}
          >{dep}</button>
        ))}
      </div>
      
      <div className="departments-list">
        {deps.map(d => (
          <div key={d.department_id} className="department-card">
            <h3 className="department-name">{d.name}</h3>
            <p className="department-detail"><strong>Department:</strong> {d.department_name}</p>
            <p className="department-detail"><strong>Description:</strong> {d.description}</p>
            <p className="department-detail"><strong>Email:</strong> {d.contact_email}</p>
            <p className="department-detail"><strong>Phone:</strong> {d.phone}</p>
            <p className="department-detail"><strong>Location:</strong> {d.office_location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departments;