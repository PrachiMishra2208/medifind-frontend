"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          MediFind — Find Your Medicine
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter medicine name..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div>
          {results.length === 0 && !loading && (
            <p className="text-gray-500">No results yet.</p>
          )}
          <ul className="space-y-3">
            {results.map((pharmacy) => (
              <li
                key={pharmacy.id}
                className="p-4 bg-white rounded shadow-sm border"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">
                      {pharmacy.name} — {pharmacy.distance} km
                    </div>
                    <div className="text-sm text-gray-600">
                      {pharmacy.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      Stock: {pharmacy.stock}
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: {pharmacy.last_updated}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
