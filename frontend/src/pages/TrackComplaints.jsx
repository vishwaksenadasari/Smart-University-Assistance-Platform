import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import api from '../api/axios';
function TrackComplaints(){
    const [complaints,setComplaints]=useState([]);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        (async ()=>{
            try{
                setLoading(true);
                const {data}=await api.get('/complaints');
                setComplaints(data);
            }catch(err){
                setError(err.response?.data?.error || 'Failed to load complaints');
            }
            finally{
                setLoading(false);
            }
        })();
    },[]);

    return (
        <div>
            <h2>Complaints</h2>
            <Link to='/complaints/create' style={{color:'crimson',textDecoration:'none',marginLeft:'120px'}}>+ Create New Complaint</Link>

            {error && <p style={{color:'red'}}>{error}</p>}
            {loading && <p>Loding complaints...</p>}

            {!loading && complaints.length===0 && <p>No Complaints yet</p>}

            {complaints.map(c=>(
                <div key={c.complaint_id} style={{border:'5px solid',borderRadius:'5px',margin:'5px',padding:'10px',marginTop:'20px'}}>
                    <h3>{c.complaint_id}. {c.title}</h3>
                    <h4>{c.description}</h4>
                    <h4>{c.status}</h4>
                </div>
            ))}
        </div>
    )
}

export default TrackComplaints;