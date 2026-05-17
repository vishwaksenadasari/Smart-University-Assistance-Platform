import { useState, useEffect } from "react";
import api from '../api/axios'
import { useLocation, useNavigate } from "react-router-dom";

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
            alert(res.data?.message);
            navigate('/login',{replace:true});
        }catch(err){
            setError(err.response?.data?.message || err.response?.data?.error || 'Password reset failed');
        }finally{
            setLoading(false);
        }
    }
    return (
        <div>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder="new password" value={password} onChange={e=>setPassword(e.target.value)} />
            <input placeholder="confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} 
            onKeyDown={e=>{
                if(e.key==='Enter') handleReset();
            }} />
            <button onClick={handleReset} disabled={loading}>{loading ? 'Updating...' : 'Submit'}</button>
        </div>
    )
}

export default ResetPassword;