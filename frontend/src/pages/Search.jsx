import { useState } from "react";
import api from '../api/axios'
import "../styles/search.css";

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getResultBadge(type) {
    const badges = {
        article: { label: 'Help Article', color: '#2D6A4F' },
        department: { label: 'Department', color: '#4F46E5' },
        notice: { label: 'Notice', color: '#DC2626' }
    };
    return badges[type] || { label: 'Result', color: '#6B7280' };
}

function Search(){
    const [query,setQuery]=useState('');
    const [results,setResults]=useState([]);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [searchPerformed,setSearchPerformed]=useState(false);
    const [searchMeta, setSearchMeta] = useState({ count: 0, query: '' });

    function highlightText(text, queryText) {
        if(!queryText || !text) return text;

        const parts = text.split(new RegExp(`(${queryText.split(/\s+/).filter(Boolean).map(escapeRegExp).join('|')})`, 'gi'));
        return parts.map((part, index) =>
            queryText && part.toLowerCase().includes(queryText.toLowerCase()) ?
                <mark key={index} className="highlight">{part}</mark> :
                part
        );
    }

    async function handleSearch(){
        const trimmedQuery = query.trim();
        if(!trimmedQuery){
            setError('Please enter a search term.');
            setResults([]);
            setSearchMeta({ count: 0, query: '' });
            setSearchPerformed(false);
            return;
        }

        setLoading(true);
        setError('');
        setSearchPerformed(false);

        try{
            const {data} = await api.get('/search',{params:{q:trimmedQuery}});
            setResults(data.results || []);
            setSearchMeta({ count: data.count || 0, query: data.query || trimmedQuery });
            setError('');
            setSearchPerformed(true);
        }catch(err){
            setResults([]);
            setSearchMeta({ count: 0, query: trimmedQuery });
            setError(err.response?.data?.error || 'Failed to search.');
            setSearchPerformed(true);
        }finally{
            setLoading(false);
        }
    }

    function renderResult(result) {
        const badge = getResultBadge(result.type);
        const snippet = result.content?.length > 220 ? `${result.content.slice(0, 220)}...` : result.content;

        return (
            <div key={`${result.type}-${result.id}`} className={`search-result-card result-${result.type}`}>
                <div className="result-header">
                    <h3 className="result-title">{highlightText(result.title, searchMeta.query)}</h3>
                    <span className="result-badge" style={{ backgroundColor: badge.color }}>{badge.label}</span>
                </div>
                <p className="result-content">{highlightText(snippet, searchMeta.query)}</p>
                {result.category && <span className="result-category">{result.category}</span>}
                {result.type === 'department' && (
                    <div className="result-meta">
                        {result.contact_email && <p className="meta-item">📧 {result.contact_email}</p>}
                        {result.phone && <p className="meta-item">📞 {result.phone}</p>}
                        {result.office_location && <p className="meta-item">📍 {result.office_location}</p>}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="search-page">
            <h2 className="search-title">Search Information</h2>
            {error && <p className="search-error">{error}</p> }

            <div className="search-controls">
                <input 
                    className="search-input-field"
                    placeholder="Search articles, departments, notices..." 
                    value={query} 
                    onChange={e=>setQuery(e.target.value)} 
                    onKeyDown={e=>{
                        if(e.key==='Enter') handleSearch();
                    }}
                />
                <button className="search-btn" onClick={handleSearch} type="button" disabled={loading}>{loading ? "Searching..." : "Search"}</button>
            </div>

            {searchPerformed && (
                <div className="search-info">
                    {searchMeta.count > 0 ? (
                        <p>{searchMeta.count} result{searchMeta.count === 1 ? '' : 's'} found for "{searchMeta.query}".</p>
                    ) : (
                        <p className="no-results">No results found for "{searchMeta.query}". Try a different keyword.</p>
                    )}
                </div>
            )}

            <div className="search-results">
                {results.map(result => renderResult(result))}
            </div>
        </div>
    );
}

export default Search;