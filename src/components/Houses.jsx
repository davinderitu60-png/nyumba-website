import { useEffect, useMemo, useState } from "react";
import { BedDouble, Bath, Ruler, Heart, ChevronLeft, ChevronRight, X, MapPin } from "lucide-react";

const money = n => "KES " + Number(n).toLocaleString("en-KE");
function PropertyModal({ item, onClose }) {
  if (!item) return null;
  const whatsapp = `https://wa.me/254717400713?text=${encodeURIComponent(`Hello, I am interested in ${item.title} in ${item.location}.`)}`;
  return <div className="modal-backdrop" onClick={onClose}><div className="property-modal" onClick={e => e.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Close"><X/></button>
    <img src={item.image} alt={item.title}/>
    <div className="modal-content"><span className="property-tag">{item.tag}</span><h2>{item.title}</h2><p className="muted"><MapPin size={15}/> {item.location}</p><strong className="modal-price">{money(item.price)} {item.period}</strong><p>{item.description}</p>
      <div className="modal-actions"><a className="outline-btn" href="tel:0717400713">Call Agent</a><a className="solid-btn" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp Agent</a></div>
    </div>
  </div></div>;
}
export default function Houses({ properties, sort, setSort, selectedProperty, activeCategory, onClearSelection, onCategory }) {
  const [saved, setSaved] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => { if (selectedProperty) setActive(selectedProperty); }, [selectedProperty]);
  const visible = useMemo(() => {
    const list = [...properties];
    if (sort === "price-low") list.sort((a,b) => a.price-b.price);
    if (sort === "price-high") list.sort((a,b) => b.price-a.price);
    return list;
  }, [properties, sort]);
  const toggle = id => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const chips = [{label:"All", value:""},{label:"Apartments",value:"Apartment"},{label:"Houses",value:"House"},{label:"Villas",value:"Villa"},{label:"Commercial",value:"Commercial"},{label:"Plots",value:"Plot"}];
  return <section className="properties-section section-wrap" id="properties">
    <div className="section-heading"><div><span className="eyebrow">EXPLORE NYUMBA</span><h2>Featured properties</h2></div><span className="result-count">{visible.length} {visible.length === 1 ? "property" : "properties"}</span></div>
    <div className="filter-chips" aria-label="Filter property category">{chips.map(chip => <button key={chip.label} className={chip.value === (activeCategory || "") ? "filter-chip active-chip" : "filter-chip"} onClick={() => onCategory?.(chip.value)}>{chip.label}</button>)}</div>
    <p className="section-intro">Explore homes and spaces around Thika.</p>
    <div className="sort-row"><span> </span><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured first</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
    {visible.length ? <div className="property-grid">{visible.map(item => <article className="property-card" key={item.id}>
      <div className="property-image"><img src={item.image} alt={item.title} loading="lazy"/><span className="property-tag">{item.tag}</span><span className="property-id">ID #{item.id}</span><button className={`heart-btn ${saved.includes(item.id) ? "is-saved" : ""}`} onClick={() => toggle(item.id)} aria-label="Save property"><Heart size={17} fill={saved.includes(item.id) ? "currentColor" : "none"}/></button><button className="image-next" onClick={() => setActive(item)} aria-label="View property"><ChevronRight size={18}/></button></div>
      <div className="property-info"><div className="property-price">{money(item.price)} <small>{item.period}</small></div><h3>{item.title}</h3><p className="property-location"><MapPin size={13}/>{item.location}</p><div className="property-meta">{item.beds > 0 && <span><BedDouble size={14}/>{item.beds} Beds</span>}{item.baths > 0 && <span><Bath size={14}/>{item.baths} Baths</span>}<span><Ruler size={14}/>{item.area}</span></div><div className="card-actions"><a className="outline-btn" href="tel:0717400713">Call Agent</a><a className="solid-btn" href={`https://wa.me/254717400713?text=${encodeURIComponent(`Hello, I am interested in ${item.title}.`)}`} target="_blank" rel="noreferrer">WhatsApp Agent</a></div><button className="details-link" onClick={() => setActive(item)}>View property details</button></div>
    </article>)}</div> : <div className="empty-state">No properties match those filters. Try changing your search.</div>}
    <PropertyModal item={active} onClose={() => { setActive(null); onClearSelection?.(); }}/>
  </section>;
}