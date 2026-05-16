import { useState } from "react";
import api from '../api/axios'

function Search(){
    const [query,setQuery]=useState('');
    const [results,setResults]=useState([]);
    const [error,setError]=useState('');
    async function handleSearch(){
        try{
            const {data}=await api.get('/search',{params:{q:query}});
            setResults(data);
            setError('');
        }catch(err){
            setError(err.response?.data?.Error || 'failed to search');
        }
    }
    return (
        <div>
            <h2>Search Information</h2>
            {error && <p style={{color:'red'}}>{error}</p> }

            <input placeholder="search..." value={query} onChange={e=>setQuery(e.target.value)} 
                onKeyDown={e=>{
                    if(e.key==='Enter') handleSearch();
                }}
            />
            <button onClick={handleSearch} type="submit">Search</button>

            {results.map(result=>(
                <div key={result.article_id}>
                    <h3>{result.title}</h3>
                    <p>{result.content}</p>
                    <h5>{result.category}</h5>
                </div>
            ))}
        </div>
    );
}

export default Search;