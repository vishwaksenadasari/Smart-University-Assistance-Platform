import { useState, useEffect } from "react";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/VerifyOtp.css";

function VerifyOtp(){
    const [otp,setOtp]=useState('');
    const location=useLocation();
    const email=location.state?.email;
    const user_id=location.state?.user_id;
    const [error,setError]=useState('');
    const isReset=location.state?.isReset;
    const navigate=useNavigate();
    const [timer, setTimer] = useState(60);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (!email) {
            navigate('/login', { replace: true });
        }
    }, [email, navigate]);

    async function handleResendOtp(){
        try {
            const payload = isReset ? { email, user_id } : { email, user_id: email.split('@')[0] }; 
            // user_id logic depends on your signup roll number convention
            const res = await api.post('/auth/verify-email', payload);
            alert(res.data?.message || 'New OTP sent');
            setError('');
            setTimer(60);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        }
    }

    async function handleOtp(){
        setLoading(true);
        try{
            const res= await api.post('/auth/verify-otp',{email,otp});
            alert(res.data?.message || res.data || 'Verification successful! Please login.');
            setError('');
            (isReset) ? navigate('/reset-password',{state:{email}}) : navigate('/login',{replace:true});
        }catch(err){
            setError(err.response?.data?.message || 'otp verification failed');
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <div className="verify-otp-page">
            <div className="verify-otp-container">
                <h2 className="verify-otp-title">Enter OTP</h2>
                <p className="verify-otp-subtitle">A verification code has been sent to <strong>{email}</strong></p>
                {error && <p className="verify-otp-error">{error}</p>}

                <div className="input-group">
                    <input className="input-field" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} 
                    onKeyDown={e=>{
                        if(e.key==='Enter') handleOtp();
                    }} />
                </div>
                <button className="btn-primary" onClick={handleOtp} disabled={loading}>{loading ? "Verifing..." : "Verify"}</button>
                <div className="otp-actions">
                    <button className="resend-btn" onClick={handleResendOtp} disabled={timer > 0}>
                        {timer > 0 ? `Resend OTP (${timer}s)` : 'Resend OTP'}
                    </button>
                </div>
                <div className="auth-links">
                    <Link to="/login" className="link-text">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;