export async function getCompanies() {
  const res = await fetch("/companies.json");
  if (!res.ok) {
    throw new Error("Failed to fetch companies: " + res.status);
  }
  return res.json();
}
