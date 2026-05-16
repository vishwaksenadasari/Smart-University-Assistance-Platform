import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api/axios'

function Login(){

  const [user_id,setUser_id]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const navigate=useNavigate();


  async function handleLogin(){
    if(!user_id || !email || !password){
      return setError('All fields are mandatory');
    }
    try{
      const {data}=await api.post('/auth/login',{user_id,email,password});
      localStorage.setItem('token',data.token);
      
      navigate('/dashboard',{replace:true});
    }catch(err){
      const msg=err.response?.data?.message || res.response?.data?.error;
      if(msg==='please verify email first.'){
        const res=await api.post('/auth/verify-email',{user_id,email});
        alert(res.data?.message || 'otp sent successfully');
        navigate('/verify-otp',{state:{email:email, replace:true}});
      }
      else{
        setError(msg || 'login failed');
      }
    }
  }
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
      onKeyDown={(e)=>{
        if(e.key==='Enter') handleLogin();
      }} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have account?<Link to='/signup'>Sign up</Link></p>
    </div>
  );
}

export default Login;