import React from "react";

export default function Loader() {
  return (
    <div className="loader" aria-live="polite">
      <div className="spinner" />
      <div>Loading companies…</div>
    </div>
  );
}
