

{/*
    at present create notices link will visible to all users 
    but except staff 
    other users cannot able to create notices
    */}



import { useState } from "react";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";

function CreateNotices(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('');
    async function handleNotices(){
        if(!title || !description){
            return setError('All fields are mandatory');
        }
        try{
            await api.post('/notices',{title,description});
            setTitle('');
            setDescription('');
            setError('');
            alert('notice created successfully');
        }catch(err){
            setError(err.response?.data?.Error || 'failed to create notice');
        }
    }
    return (
        <div>
            <h2>Create Notice</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input placeholder="description" value={description} onChange={e=>setDescription(e.target.value)} onKeyDown={e=>{
                if(e.key==='Enter') handleNotices();
            }} />
            <button onClick={handleNotices} type="submit">submit</button>
        </div>
    );
}

export default CreateNotices;