import React from "react";

export default function Filters({
  query,
  setQuery,
  industry,
  setIndustry,
  industries = [],
  location,
  setLocation,
  locations = [],
  sortBy,
  setSortBy
}) {
  return (
    <div className="filters" style={{ marginBottom: 12 }}>
      <input
        type="text"
        placeholder="Search by name, industry or location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="search"
      />

      <select value={industry} onChange={(e) => setIndustry(e.target.value)} aria-label="industry">
        <option value="">All Industries</option>
        {industries.filter(Boolean).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="location">
        <option value="">All Locations</option>
        {locations.filter(Boolean).map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="sort">
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </div>
  );
}
