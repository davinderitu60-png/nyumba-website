import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Houses from "./components/Houses.jsx";
import Locations from "./components/Locations.jsx";
import Footer from "./components/Footer.jsx";
import { properties as allProperties } from "./data/properties";

const emptyFilters = { location: "", minPrice: "", maxPrice: "", category: "" };
export default function App() {
  const [filters, setFilters] = useState(emptyFilters);
  const [applied, setApplied] = useState({ ...emptyFilters, query: "" });
  const [sort, setSort] = useState("featured");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filtered = useMemo(() => allProperties.filter(p => {
    const term = (applied.query || "").trim().toLowerCase();
    const searchable = [p.id, p.title, p.location, p.category, p.type, p.area, p.description, `${p.beds} bed`, `${p.beds} bedroom`, `${p.beds} room`, `${p.baths} bath`].join(" ").toLowerCase();
    const bedMatch = /(?:^|\D)(\d+)\s*(?:bed(?:room)?s?|rooms?|br)(?:\D|$)/i.exec(term) || /(?:bed(?:room)?s?|rooms?)\s*(\d+)(?:\D|$)/i.exec(term);
    const idMatch = /^(?:id\s*#?\s*)?#?(\d+)$/i.exec(term);
    const queryOK = idMatch ? p.id === Number(idMatch[1]) : (!term || searchable.includes(term) || (bedMatch && p.beds === Number(bedMatch[1])));
    const locationOK = !applied.location || p.location.toLowerCase().includes(applied.location.toLowerCase()) || p.title.toLowerCase().includes(applied.location.toLowerCase());
    const minOK = !applied.minPrice || p.price >= Number(applied.minPrice);
    const maxOK = !applied.maxPrice || p.price <= Number(applied.maxPrice);
    const typeOK = !applied.category || p.category.toLowerCase() === applied.category.toLowerCase();
    return queryOK && locationOK && minOK && maxOK && typeOK;
  }), [applied]);

  const searchHeader = useCallback((query) => {
    setApplied({ ...emptyFilters, query });
    setSelectedProperty(null);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const chooseCategory = useCallback((category) => {
    setFilters(emptyFilters);
    setApplied({ ...emptyFilters, category, query: "" });
    setSelectedProperty(null);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const openProperty = useCallback((property) => {
    setApplied({ ...emptyFilters, query: String(property.id) });
    setSelectedProperty(property);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const searchHero = () => {
    setApplied({ ...filters, query: "" });
    setSelectedProperty(null);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const chooseLocation = name => {
    const next = { ...emptyFilters, location: name };
    setFilters(next); setApplied({ ...next, query: "" }); setSelectedProperty(null);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <><Header properties={allProperties} onSearch={searchHeader} onCategory={chooseCategory} onPropertySelect={openProperty}/><main><Hero filters={filters} setFilters={setFilters} onSearch={searchHero}/><Houses properties={filtered} sort={sort} setSort={setSort} selectedProperty={selectedProperty} activeCategory={applied.category} onClearSelection={() => setSelectedProperty(null)} onCategory={chooseCategory}/><Locations onChoose={chooseLocation}/></main><Footer/></>;
}
