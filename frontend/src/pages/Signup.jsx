import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from '../api/axios'

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
            navigate('/verify-otp',{state: {email:email , replace:true}});
        }catch(err){
            setError(err.response?.data?.error || 'Signup failed');
        }
    }
    return (
        <div>
            <h2>Create Account</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
            <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={(e)=>{
                if(e.key==='Enter') handlerSignup();
            }} />
            <button onClick={handlerSignup}>Sign up</button>
            <p>Already have Account?<Link to='/login'>Login</Link></p>
        </div>
    );
}

export default Signup;