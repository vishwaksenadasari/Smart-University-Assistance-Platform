import { useState } from "react";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function VerifyOtp(){
    const [otp,setOtp]=useState('');
    const location=useLocation();
    const email=location.state?.email;
    const [error,setError]=useState('');
    const navigate=useNavigate();
    async function handleOtp(){
        try{
            const res= await api.post('/auth/verify-otp',{email,otp});
            alert(res.data?.message || res.data || 'Verification successful! Please login.');
            setError('');
            navigate('/login',{replace:true});
        }catch(err){
            setError(err.response?.data?.message || 'otp verification failed');
        }
    }
    
    return (
        <div>
            <h2>Enter Otp</h2>
            {error && <p style={{color:'red'}}>{error}</p>}

            <input placeholder="otp" value={otp} onChange={e=>setOtp(e.target.value)} 
            onKeyDown={e=>{
                if(e.key==='Enter') handleOtp();
            }} />
            <button onClick={handleOtp}>Verify</button>
        </div>
    );
}

export default VerifyOtp;