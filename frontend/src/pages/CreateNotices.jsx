
import { useState } from "react";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";
import "../styles/CreateNotices.css";
import toast from "react-hot-toast";


function CreateNotices(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [error,setError]=useState('');
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    async function handleNotices(){
        if(!title || !description){
            return setError('All fields are mandatory');
        }
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try{
            await api.post('/notices',{title,description}, { headers });
            setTitle('');
            setDescription('');
            setError('');
            toast.success('notice created successfully');
            navigate('/admin/notices');
        }catch(err){
            setError(err.response?.data?.Error || 'failed to create notice');
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="create-notice-page">
            <div className="create-notice-container">
                <h2 className="create-notice-title">Post New Notice</h2>
                {error && <p className="create-notice-error">{error}</p>}
                <div className="input-group">
                    <input className="input-field" placeholder="Notice Title" value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className="input-group">
                    <textarea 
                        className="input-field textarea-field" 
                        placeholder="Notice Content" 
                        value={description} 
                        onChange={e=>setDescription(e.target.value)} 
                    />
                </div>
                <button className="btn-submit" onClick={handleNotices} type="submit" disabled={loading}>{loading ? "Submiting Notice..." : "Submit Notice"}</button>
            </div>
        </div>
    );
}

export default CreateNotices;