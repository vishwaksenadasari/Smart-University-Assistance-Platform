import { useState,useEffect } from "react";
import api from '../api/axios';

function Departments() {
  const [deps,setDeps]=useState([]);
  const [department,setDepartment]=useState('');
  const [error,setError]=useState('');
  useEffect(()=>{
    (async ()=>{
      try{
        const {data}=await api.get('/departments',{params: {department_name : department}});
        setDeps(data);
      }
      catch(err){
        setError(err.response?.data?.error || 'failed to fetch departments');
      }
    })();
  },[department]);

  const departmentsList = ['All', 'Examination', 'CSE', 'Library'];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Departments</h2>
      {error && <p style={{color:'red'}}>{error}</p>}

      <div className="flex gap-4 mb-6">
        {departmentsList.map(dep=>(
          <button key={dep}
            onClick={()=>setDepartment(dep==='All'?"":dep)}>{dep}</button>
        ))}
      </div>
      
      {deps.map(d => (
        <div key={d.department_id} className="p-4 border mb-3">
          <h3>{d.name}</h3>
          <p>{d.department_name}</p>
          <p>{d.description}</p>
          <p>{d.contact_email}</p>
          <p>{d.phone}</p>
          <p>{d.office_location}</p>
        </div>
      ))}
    </div>
  );
}

export default Departments;