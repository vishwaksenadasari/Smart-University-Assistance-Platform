import { useState, useEffect } from "react";
import api from '../api/axios'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";
import toast from "react-hot-toast";

function ResetPassword(){
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const location=useLocation();
    const email=location.state?.email;
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    async function handleReset(){
        try{
            if(password!==confirmPassword){
                return setError('password and confirm must be same');
            }
            if(password.length < 6){
                return setError('Password must be at least 6 characters');
            }
            setLoading(true);
            const res=await api.post('/auth/reset-password',{email,password});
            toast.success(res.data?.message);
            navigate('/login',{replace:true});
        }catch(err){
            setError(err.response?.data?.message || err.response?.data?.error || 'Password reset failed');
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <h2 className="reset-password-title">Reset Password</h2>
                {error && <p className="reset-password-error">{error}</p>}
                <div className="input-group">
                    <input className="input-field" type="password" placeholder="New Password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <input className="input-field" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} 
                    onKeyDown={e=>{
                        if(e.key==='Enter') handleReset();
                    }} />
                </div>
                <button className="btn-primary" onClick={handleReset} disabled={loading}>
                    {loading ? 'Updating...' : 'Submit'}
                </button>
            </div>
        </div>
    )
}

export default ResetPassword;