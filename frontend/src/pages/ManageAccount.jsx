import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import "../styles/ManageAccount.css";
import toast from 'react-hot-toast';

function ManageAccount(){
    const [name,setName]=useState('');
    //const [email,setEmail]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    async function handleChange(){
        setLoading(true);
        setError('');
        try{
            const {data}=await api.put('/manage',{name});
            toast.success(data?.message);
            navigate('/student/dashboard');
        }catch(err){
            setError(err.response?.data?.mesaage);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="manage-account-page">
            <div className="manage-account-container">
                <h2 className="manage-account-title">Account Settings</h2>
                {error && <p className="manage-account-error">{error}</p>}
                <div className="input-group">
                    <input 
                        className="input-field"
                        placeholder='Update Name' 
                        value={name} 
                        onChange={e=>setName(e.target.value)} 
                        onKeyDown={e=>{
                            if(e.key==='Enter') handleChange();
                        }}
                    />
                </div>
                <button className="btn-submit" onClick={handleChange} disabled={loading}>{loading ? "Saving Changes..." : "Save Changes"}</button>
            </div>
        </div>
    )
}

export default ManageAccount;