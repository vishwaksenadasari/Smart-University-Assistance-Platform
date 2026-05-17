import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'

function ForgotPassword(){
    //const [password,setPassword]=useState('');
    const [user_id,setUser_id]=useState('');
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('');
    async function handleReset(){
        if(!user_id || !email){
            return setError('all fields are mandatory');
        }
        const cleanEmail = email.trim();
        const cleanUserId = user_id.trim();
        try{
            const result=await api.post('/auth/verify-email',{user_id: cleanUserId, email: cleanEmail});
            alert(result.data?.message || 'otp set successfully');
            navigate('/verify-otp', { state: { isReset: true, email: cleanEmail, user_id: cleanUserId } });
        }catch(err){
            setError(err.response?.data?.message || err.response?.data?.error || 'Request failed');
        }
    }
    return(
        <div>
            <h2>Forgot Password</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
            <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>{
                if(e.key==='Enter') handleReset();
            }}
            />
            <button onClick={handleReset}>Send Otp</button>
        </div>
    )
}

export default ForgotPassword;