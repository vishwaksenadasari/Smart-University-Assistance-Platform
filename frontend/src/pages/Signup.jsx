import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from '../api/axios'
import "../styles/signup.css";

function Signup(){

    const [user_id,setUser_id]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();


    async function handlerSignup(){
        if(!user_id || !name || !email || !password){
            return setError('All fields are required');
        }
        try{
            const res = await api.post('/auth/signup',{user_id,name,email,password});
            alert(res.data?.message || 'otp sent succesfully');
            navigate('/verify-otp',{state: {email:email }, replace:true});
        }catch(err){
            setError(err.response?.data?.error || 'Signup failed');
        }
    }
    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title">Create Account</h2>
                {error && <p className="signup-error">{error}</p>}
                <div className="input-group">
                    <input className="input-field" placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
                </div>
                <div className="input-group">
                    <input className="input-field" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div className="input-group">
                    <input className="input-field" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <input className="input-field" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={(e)=>{
                        if(e.key==='Enter') handlerSignup();
                    }} />
                </div>
                <button className="btn-primary" onClick={handlerSignup}>Sign up</button>
                <div className="auth-links">
                    <p>Already have an account? <Link to='/login' className="link-text">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;