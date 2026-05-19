import { useEffect, useState } from "react";
import api from '../api/axios';
import { Link } from "react-router-dom";

function ManageNotices(){
    const [notices,setNotices]=useState([]);
    const [error,setError]=useState('');
    async function fetchNotices(){
        try{
            const {data}=await api.get('/admin/notices');
            setNotices(data);
        }catch(err){
            setError(err.response?.data?.error || 'failed to load notices');
        }
    }
    useEffect(()=>{
        fetchNotices();
    },[]);

    return (
        <div>
            <h2>Notices Table</h2>
            <h4><Link to='/admin/notices/create'>+ Create Notices</Link></h4>
            {error && <p style={{color:'red'}}>{error}</p>}
            <table>
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
                            <td>{n.notice_id}</td>
                            <td>{n.title}</td>
                            <td>{n.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageNotices;