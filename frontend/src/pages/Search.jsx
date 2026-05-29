import { useState } from "react";
import api from '../api/axios'
import "../styles/search.css";

function Search(){
    const [query,setQuery]=useState('');
    const [results,setResults]=useState([]);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    async function handleSearch(){
        setLoading(true);
        try{
            const {data}=await api.get('/search',{params:{q:query}});
            setResults(data);
            setError('');
        }catch(err){
            setError(err.response?.data?.Error || 'failed to search');
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="search-page">
            <h2 className="search-title">Search Information</h2>
            {error && <p className="search-error">{error}</p> }

            <div className="search-controls">
                <input 
                    className="search-input-field"
                    placeholder="Search for articles, guides..." 
                    value={query} 
                    onChange={e=>setQuery(e.target.value)} 
                    onKeyDown={e=>{
                        if(e.key==='Enter') handleSearch();
                    }}
                />
                <button className="search-btn" onClick={handleSearch} type="submit" disabled={loading}>{loading ? "Searching..." : "Search"}</button>
            </div>

            <div className="search-results">
                {results.map(result=>(
                    <div key={result.article_id} className="search-result-card">
                        <h3 className="result-title">{result.title}</h3>
                        <p className="result-content">{result.content}</p>
                        <span className="result-category">{result.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;