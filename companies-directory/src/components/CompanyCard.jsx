import React from "react";

export default function CompanyCard({ company }) {
  return (
    <div className="card" role="article">
      <h3>{company.name}</h3>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Industry:</strong> {company.industry}</p>
    </div>
  );
}
