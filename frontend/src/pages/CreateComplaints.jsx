import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import "../styles/CreateComplaints.css";

function CreateComplaints(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [error,setError]=useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleComplaints(){
        if(!title || !description){
            return setError('All fields are mandatory');
        }
        setLoading(true);
        setError('');
        try{
            await api.post('/complaints',{title,description});
            setError('');
            alert('complaint created successfully');
            navigate('/complaints');
        }catch(err){
            setError(err.response?.data?.error || 'Complaint submission failed');
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="create-complaint-page">
            <div className="create-complaint-container">
                <h2 className="create-complaint-title">Register Complaint</h2>
                {error && <p className="create-complaint-error">{error}</p>}
                <div className="input-group">
                    <input className="input-field" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className="input-group">
                    <textarea 
                        className="input-field textarea-field" 
                        placeholder='Describe your issue in detail...' 
                        value={description} 
                        onChange={e=>setDescription(e.target.value)} 
                    />
                </div>
                <button className="btn-submit" onClick={handleComplaints} disabled={loading}>{loading ? "Submiting Issue..." : "Submit Issue"}</button>
            </div>
        </div>
    );
}

export default CreateComplaints;