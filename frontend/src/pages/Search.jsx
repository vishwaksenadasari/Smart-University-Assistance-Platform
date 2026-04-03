import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  const results = [
    "Transcript Procedure",
    "Examination Department",
    "R18 Regulation PDF"
  ];

  return (
    <div className="p-6">
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {results
          .filter(r => r.toLowerCase().includes(query.toLowerCase()))
          .map((r, i) => (
            <li key={i} className="p-2 border-b">{r}</li>
          ))}
      </ul>
    </div>
  );
}