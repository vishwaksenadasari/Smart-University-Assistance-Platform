import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Feedback.css";

function Feedback(){
    const [mess,setMess]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();

    async function handleFeedback(){
        if(!mess.trim()){
            return setError('Feedback message cannot be empty');
        }
        try{
            const {data}=await api.post('/feedback',{mess});
            alert(data?.message);
            navigate('/dashboard');
        }catch(err){
            setError(err.response?.data?.error || 'Failed to submit feedback');
        }
    }

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <h2 className="feedback-title">Share Your Feedback</h2>
                {error && <p className="feedback-error">{error}</p>}
                <div className="input-group">
                    <textarea 
                        className="input-field textarea-field"
                        placeholder='How can we improve your experience?' 
                        value={mess} 
                        onChange={e=>setMess(e.target.value)} 
                    />
                </div>
                <button className="btn-submit" onClick={handleFeedback}>Send Feedback</button>
            </div>
        </div>
    )
}

export default Feedback;