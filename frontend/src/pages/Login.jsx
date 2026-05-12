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
      
      navigate('/dashboard');
    }catch(err){
      setError(err.response?.data?.error || 'Login failed');
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