import React, { useEffect, useMemo, useState } from "react";
import { getCompanies } from "../services/api";
import Filters from "../components/Filters";
import CompanyTable from "../components/CompanyTable";
import CompanyCard from "../components/CompanyCard";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox.jsx";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");  
  const [view, setView] = useState("table"); 

  useEffect(() => {
    setLoading(true);
    getCompanies()
      .then((data) => {
        setCompanies(data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load data");
      })
      .finally(() => setLoading(false));
  }, []);

  // derived values for filter dropdown options
  const industries = useMemo(() => {
    const set = new Set(companies.map((c) => c.industry));
    return ["", ...Array.from(set)];
  }, [companies]);

  const locations = useMemo(() => {
    const set = new Set(companies.map((c) => c.location));
    return ["", ...Array.from(set)];
  }, [companies]);

  // filter + sort
  const filtered = useMemo(() => {
    let list = companies.slice();

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.industry && c.industry.toLowerCase().includes(q)) ||
          (c.location && c.location.toLowerCase().includes(q))
      );
    }

    if (industry) {
      list = list.filter((c) => c.industry === industry);
    }
    if (location) {
      list = list.filter((c) => c.location === location);
    }

    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [companies, debouncedQuery, industry, location, sortBy]);

  return (
    <>
      <div className="header">
        <h1 className="title">Companies Directory</h1>

        <div className="controls">
          <div className="view-toggle" role="group" aria-label="view toggle">
            <button
              className={`toggle-btn ${view === "table" ? "active" : ""}`}
              onClick={() => setView("table")}
            >
              Table
            </button>
            <button
              className={`toggle-btn ${view === "cards" ? "active" : ""}`}
              onClick={() => setView("cards")}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      <Filters
        query={query}
        setQuery={setQuery}
        industry={industry}
        setIndustry={setIndustry}
        industries={industries}
        location={location}
        setLocation={setLocation}
        locations={locations}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading && <Loader />}

      {error && <ErrorBox message={error} />}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div style={{ marginTop: 12 }}>No companies match your filters.</div>
          ) : view === "table" ? (
            <div className="table-wrap">
              <CompanyTable companies={filtered} />
            </div>
          ) : (
            <div className="cards-grid" style={{ marginTop: 12 }}>
              {filtered.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
