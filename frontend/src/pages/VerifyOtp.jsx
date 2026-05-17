import { useState, useEffect } from "react";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function VerifyOtp(){
    const [otp,setOtp]=useState('');
    const location=useLocation();
    const email=location.state?.email;
    const user_id=location.state?.user_id;
    const [error,setError]=useState('');
    const isReset=location.state?.isReset;
    const navigate=useNavigate();
    const [timer, setTimer] = useState(60);

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
        try{
            const res= await api.post('/auth/verify-otp',{email,otp});
            alert(res.data?.message || res.data || 'Verification successful! Please login.');
            setError('');
            (isReset) ? navigate('/reset-password',{state:{email}}) : navigate('/login',{replace:true});
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
            <button onClick={handleResendOtp} disabled={timer > 0} style={{marginLeft: '10px'}}>
                {timer > 0 ? `Resend OTP (${timer}s)` : 'Resend OTP'}
            </button>
        </div>
    );
}

export default VerifyOtp;