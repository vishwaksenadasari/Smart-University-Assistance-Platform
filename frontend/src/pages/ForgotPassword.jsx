import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'
import "../styles/ForgotPassword.css";
import toast from "react-hot-toast";

function ForgotPassword(){
    //const [password,setPassword]=useState('');
    const [user_id,setUser_id]=useState('');
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    async function handleReset(){
        if(!user_id || !email){
            return setError('all fields are mandatory');
        }
        setLoading(true);
        const cleanEmail = email.trim();
        const cleanUserId = user_id.trim();
        try{
            const result=await api.post('/auth/verify-email',{user_id: cleanUserId, email: cleanEmail});
            toast.success(result.data?.message || 'otp set successfully');
            navigate('/verify-otp', { state: { isReset: true, email: cleanEmail, user_id: cleanUserId } });
        }catch(err){
            setError(err.response?.data?.message || err.response?.data?.error || 'Request failed');
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <h2 className="forgot-password-title">Forgot Password</h2>
                {error && <p className="forgot-password-error">{error}</p>}
                <div className="input-group">
                    <input className="input-field" placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
                </div>
                <div className="input-group">
                    <input className="input-field" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
                    onKeyDown={e=>{
                        if(e.key==='Enter') handleReset();
                    }}
                    />
                </div>
                <button className="btn-primary" onClick={handleReset} disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</button>
            </div>
        </div>
    )
}

export default ForgotPassword;