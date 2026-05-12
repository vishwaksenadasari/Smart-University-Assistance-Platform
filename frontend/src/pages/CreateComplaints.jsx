import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CreateComplaints(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [error,setError]=useState('');
    const navigate = useNavigate();
    async function handleComplaints(){
        if(!title || !description){
            return setError('All fields are mandatory');
        }
        try{
            await api.post('/complaints',{title,description});
            setError('');
            navigate('/complaints');
        }catch(err){
            setError(err.response?.data?.error || 'Complaint submission failed');
        }
    }
    return (
        <div>
            <h2>Register Complaint</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder='title' value={title} onChange={e=>setTitle(e.target.value)} />
            <input placeholder='decription' value={description} onChange={e=>setDescription(e.target.value)} 
            onKeyDown={e=>{
                if(e.key==='Enter') handleComplaints();
            }}
            />
            <button onClick={handleComplaints}>Submit</button>
        </div>
    );
}

export default CreateComplaints;