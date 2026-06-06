import { useEffect, useState } from "react";
import api from '../api/axios';
import "../styles/ManageComplaints.css";
import toast from "react-hot-toast";

function ManageComplaints(){
    const [complaints,setComplaints]=useState([]);
    const [error,setError]=useState('');

    async function fetchComplaints(){
        const token = localStorage.getItem('token');
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try{
            const {data}=await api.get('/admin/complaints', { headers });
            setComplaints(data);
        }catch(err){
            setError(err.response?.data?.error || 'failed to load complaints');
        }
    }
    useEffect(()=>{
        fetchComplaints();
    },[]);

    async function updateStatus(id,status){
        const token = localStorage.getItem('token');
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try{
            await api.put(`/complaints/${id}`,{status}, { headers });
            toast.success('complaint updated successfully');
            fetchComplaints();
        }catch(err){
            setError(err.response?.data?.error || 'failed to update status of complaint');
        }
    }

    return (
        <div className="manage-complaints-page">
            <div className="manage-header">
                <h2 className="manage-title">Complaints Management</h2>
            </div>
            {error && <p className="manage-error">{error}</p>}
            
            <div className="complaints-table-container">
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Registered At</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Student</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
                        .map(c=>(
                            <tr key={c.complaint_id}>
                                <td className="id-cell">#{c.complaint_id}</td>
                                <td>{new Date(c.created_at).toLocaleDateString()}</td>
                                <td className="title-cell">{c.title}</td>
                                <td>{c.description}</td>
                                <td className="student-id-cell">{c.student_id}</td>
                                <td>{c.status}</td>
                                <td>
                                    <select 
                                        className="status-select"
                                        value={c.status} 
                                        onChange={(e)=>updateStatus(c.complaint_id,e.target.value)}
                                    >
                                        <option value='pending'>Pending</option>
                                        <option value='in progress'>In Progress</option>
                                        <option value='Resolved'>Resolved</option>
                                        <option value='Rejected'>Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageComplaints;