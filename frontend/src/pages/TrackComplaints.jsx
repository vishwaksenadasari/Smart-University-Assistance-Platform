import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from '../api/axios';
import "../styles/TrackComplaints.css";

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
        <div className="track-complaints-page">
            <div className="track-header">
                <h2 className="track-title">Your Complaints</h2>
                <Link to='/complaints/create' className="btn-create">+ Create New Complaint</Link>
            </div>

            {error && <p className="error-text">{error}</p>}
            {loading && <p className="loading-text">Loading your complaints...</p>}

            {!loading && complaints.length === 0 && !error && (
                <p className="empty-text">No complaints found. If you have an issue, please register it.</p>
            )}

            <div className="complaints-list">
                {complaints.map(c => (
                    <div key={c.complaint_id} className="complaint-card">
                        <div className="complaint-card-header">
                            <h3 className="complaint-id-title">
                                #{c.complaint_id} {c.title}
                            </h3>
                            <span className={`status-badge ${c.status?.toLowerCase().replace(' ', '')}`}>
                                {c.status}
                            </span>
                        </div>
                        <p className="complaint-description">{c.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackComplaints;