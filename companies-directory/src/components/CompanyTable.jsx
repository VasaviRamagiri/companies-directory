import React from "react";

export default function CompanyTable({ companies = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Location</th>
          <th>Industry</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.location}</td>
            <td>{c.industry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
