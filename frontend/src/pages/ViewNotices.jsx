import { useState,useEffect } from "react";
import api from '../api/axios'

function ViewNotices(){
    const [notices,setNotices]=useState([]);
    const [department,setDepartment]=useState('');
    const [error,setError]=useState('');
    useEffect(()=>{
        (async ()=>{
            try{
                const {data}=await api.get('/notices',{params: {department_name:department}});
                setNotices(data);
            }catch(err){
                setError(err.response?.data?.Error || 'failed to load notices');
            }
        })();
    },[department]);
    const deps=["All","Examination","Library","CSE"];
    return (
        <div>
            <h2>Notices</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <div className="flex gap-4">
                {deps.map(dep=>(
                    <button key={dep} onClick={()=>setDepartment(dep==='All'?'':dep)} >{dep}</button>
                ))}
            </div>
            {notices.map(notice=>(
                <div key={notice.notice_id}>
                    <h3>{notice.title}</h3>
                    <p>{notice.description}</p>    
                </div>
            ))}
        </div>
    );
}

export default ViewNotices;