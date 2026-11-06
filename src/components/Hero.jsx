import SearchPanel from "./Search.jsx";
export default function Hero({ filters, setFilters, onSearch }) {
  return <section className="hero" id="top">
    <div className="hero-copy"><span className="eyebrow hero-eyebrow">A BETTER WAY TO FIND HOME</span><h1>Find your<br/><em>perfect space.</em></h1><p>Discover places you'll love to live, work and grow.</p></div>
    <div className="hero-search"><SearchPanel filters={filters} setFilters={setFilters} onSearch={onSearch}/></div>
  </section>;
}