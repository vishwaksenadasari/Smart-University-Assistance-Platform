import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      
      <input
        type="text"
        placeholder="Search university information..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

    </div>
  );
}