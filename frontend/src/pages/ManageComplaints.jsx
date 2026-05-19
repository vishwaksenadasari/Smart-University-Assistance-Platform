import { useEffect, useState } from "react";
import api from '../api/axios';

function ManageComplaints(){
    const [complaints,setComplaints]=useState([]);
    const [error,setError]=useState('');
    async function fetchComplaints(){
        try{
            const {data}=await api.get('/admin/complaints');
            setComplaints(data);
        }catch(err){
            setError(err.response?.data?.error || 'failed to load complaints');
        }
    }
    useEffect(()=>{
        fetchComplaints();
    },[]);

    async function updateStatus(id,status){
        try{
            await api.put(`/complaints/${id}`,{status});
            alert('complaint updated successfully');
            fetchComplaints();
        }catch(err){
            setError(err.response?.data?.error || 'failed to update status of complaint');
        }
    }

    return (
        <div>
            <h2>Complaints Table</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Complaint Id</th>
                        <th>Complaint Title</th>
                        <th>Complaint Description</th>
                        <th>Student Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(c=>(
                        <tr key={c.complaint_id}>
                            <td>{c.complaint_id}</td>
                            <td>{c.title}</td>
                            <td>{c.description}</td>
                            <td>{c.student_id}</td>
                            <td>{c.status}</td>
                            <td>
                                <select value={c.status} onChange={(e)=>updateStatus(c.complaint_id,e.target.value)}>
                                    <option value='pending'>pending</option>
                                    <option value='in progress'>In progress</option>
                                    <option value='Resolved'>Resolved</option>
                                    <option value='Rejected'>Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageComplaints;