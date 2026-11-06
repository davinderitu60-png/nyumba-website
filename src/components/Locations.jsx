import { MapPin, ArrowUpRight } from "lucide-react";
import { locations } from "../data/properties";
export default function Locations({ onChoose }) {
  return <section className="locations-section" id="locations"><div className="section-wrap"><span className="eyebrow">FIND YOUR NEIGHBOURHOOD</span><div className="section-heading"><div><h2>Explore by location</h2><p className="section-intro">Start with the neighbourhood that feels like home.</p></div></div>
    <div className="location-grid">{locations.map(loc => <button className="location-card" key={loc.name} onClick={() => onChoose(loc.name)}><img src={loc.image} alt=""/><span className="location-overlay"></span><span className="location-text"><strong><MapPin size={14}/>{loc.name}</strong><small>{loc.count}</small></span><ArrowUpRight className="location-arrow" size={19}/></button>)}</div>
  </div></section>;
}