import { useNavigate } from "react-router-dom";
import api from '../api/axios'
import { useEffect } from "react";
import { useState } from "react";
import "../styles/Account.css";

function Account(){
    const [details,setDetails]=useState(null);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    async function getDetails(){
        try{
            const {data} = await api.get('/manage');
            // Ensure we handle both array and object responses
            setDetails(Array.isArray(data) ? data[0] : data);
            setLoading(false);
        }catch(err){
            setError(err.response?.data?.error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        getDetails();
    },[]);

    function modify(){
        navigate('/manage-account');
    }

    if (loading) return <div className="account-page"><p>Loading profile...</p></div>;

    return (
        <div className="account-page">
            <div className="account-container">
                <h2 className="account-title">My Profile</h2>
                <div className="account-avatar">{details?.name?.charAt(0) || 'U'}</div>
                
                {error && <p className="manage-account-error">{error}</p>}
                
                <div className="info-card">
                    <div className="info-item">
                        <span className="info-label">Roll Number</span>
                        <span className="info-value">{details?.user_id}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{details?.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{details?.email}</span>
                    </div>
                </div>
                <button className="btn-modify" onClick={modify}>Edit Profile</button>
            </div>
        </div>
    );
}

export default Account;