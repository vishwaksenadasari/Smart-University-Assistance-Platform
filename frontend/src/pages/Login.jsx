import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api/axios'
import {jwtDecode} from 'jwt-decode'
import "../styles/login.css";

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
    const cleanUserId = user_id.trim();
    const cleanEmail = email.trim();

    try{
      const {data}=await api.post('/auth/login',{user_id: cleanUserId, email: cleanEmail, password});
      localStorage.setItem('token',data.token);
      const decoded=jwtDecode(data.token);
      if(decoded.role==='staff'){
        navigate('/admin/dashboard',{replace:true});
      }else{
        navigate('/dashboard',{replace:true});
      }
      }catch(err){
      const msg = err.response?.data?.message || err.response?.data?.error || 'Login failed';
      if(msg === 'please verify email first.'){
        const res=await api.post('/auth/verify-email',{user_id: cleanUserId, email: cleanEmail});
        alert(res.data?.message || 'otp sent successfully');
        navigate('/verify-otp', { state: { email: cleanEmail }, replace: true });
      }
      else{
        setError(msg || 'login failed');
      }
    }
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <div className="input-group">
          <input className="input-field" placeholder="Roll Number" value={user_id} onChange={e=>setUser_id(e.target.value)} />
        </div>
        <div className="input-group">
          <input className="input-field" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==='Enter') handleLogin();
          }} />
        </div>
        <button className="btn-primary" onClick={handleLogin}>Login</button>
        <div className="auth-links">
          <p><Link to='/forgot-password' className="link-text">Forgot password?</Link></p>
          <p>Don't have an account? <Link to='/signup' className="link-text">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
export default Login;