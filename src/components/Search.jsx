import { Search } from "lucide-react";

export default function SearchPanel({ filters, setFilters, onSearch }) {
  const update = (key, value) => setFilters(old => ({ ...old, [key]: value }));
  return <section className="search-panel" aria-label="Find a property">
    <label>LOCATION<input value={filters.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Thika, Kiambu"/></label>
    <label>MAX PRICE · KES<input type="number" value={filters.maxPrice} onChange={e => update("maxPrice", e.target.value)} placeholder="Any price"/></label>
    <label>MIN PRICE · KES<input type="number" value={filters.minPrice} onChange={e => update("minPrice", e.target.value)} placeholder="Any price"/></label>
    <label>PROPERTY TYPE<select value={filters.category} onChange={e => update("category", e.target.value)}><option value="">Any type</option><option>Apartment</option><option>House</option><option>Single Room</option><option>Commercial</option><option>Plot</option></select></label>
    <button className="search-button" onClick={onSearch}><Search size={16}/> Search</button>
  </section>;
}