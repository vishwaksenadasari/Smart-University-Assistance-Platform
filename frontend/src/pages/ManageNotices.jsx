import { useEffect, useState } from "react";
import api from '../api/axios';
import { Link } from "react-router-dom";
import "../styles/ManageNotices.css";

function ManageNotices(){
    const [notices,setNotices]=useState([]);
    const [error,setError]=useState('');
    async function fetchNotices(){
        const token = localStorage.getItem('token');
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try{
            const {data}=await api.get('/admin/notices', { headers });
            setNotices(data);
        }catch(err){
            setError(err.response?.data?.error || 'failed to load notices');
        }
    }
    useEffect(()=>{
        fetchNotices();
    },[]);

    return (
        <div className="manage-notices-page">
            <div className="manage-header">
                <h2 className="manage-title">Manage Notices</h2>
                <Link to='/admin/notices/create' className="btn-create">+ Create New Notice</Link>
            </div>
            {error && <p className="manage-error">{error}</p>}
            
            <div className="notices-table-container">
                <table className="notices-table">
                    <thead>
                        <tr>
                            <th>Notice Id</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map(n=>(
                            <tr key={n.notice_id}>
                                <td className="id-cell">#{n.notice_id}</td>
                                <td className="title-cell">{n.title}</td>
                                <td>{n.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageNotices;