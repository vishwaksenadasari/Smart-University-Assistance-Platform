import { useState,useEffect } from "react";
import api from '../api/axios'
import "../styles/ViewNotices.css";

function ViewNotices(){
    const [notices,setNotices]=useState([]);
    const [department,setDepartment]=useState('');
    const [error,setError]=useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            try{
                const {data}=await api.get('/notices',{params: {department_name:department}, headers});
                setNotices(data);
                setError('');
            }catch(err){
                setError(err.response?.data?.Error || 'failed to load notices');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[department]);

    const deps=["All","Examination","Library","CSE","ECE"];

    return (
        <div className="view-notices-page">
            <div className="notices-header">
                <h2 className="notices-title">Notices</h2>
                {error && <p className="notices-error">{error}</p>}
            </div>
            <div className="department-filters">
                {deps.map(dep=>(
                    <button key={dep} 
                            onClick={()=>setDepartment(dep==='All'?'':dep)}
                            className={`filter-btn ${department === (dep === 'All' ? '' : dep) ? 'active' : ''}`}
                    >{dep}</button>
                ))}
            </div>

            {loading && <p className="loading-text">Loading notices...</p>}

            {!loading && notices.length === 0 && !error && (
                <p className="empty-text">No notices available at the moment.</p>
            )}

            <div className="notices-list">
                {notices
                .sort((a,b)=>new Date(b.created_at) - new Date(a.created_at))
                .map(notice=>(
                    <div key={notice.notice_id} className="notice-card">
                        <h3 className="notice-title">{notice.title}</h3>
                        <p className="notice-description">{notice.description}</p>    
                        <p>{new Date(notice.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewNotices;