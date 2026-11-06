import { useEffect, useMemo, useRef, useState } from "react";
import { House, Menu, X, Search, UserRound, Plus, MapPin } from "lucide-react";

const categories = ["Apartment", "House", "Villa", "Commercial", "Plot"];

function ActionDialog({ mode, onClose }) {
  const isLogin = mode === "login";
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    setBusy(true);
    // The supplied project has no authentication or property-submission API.
    // Keep the forms functional without pretending data was saved or a user authenticated.
    window.setTimeout(() => {
      setBusy(false);
      setMessage(isLogin
        ? "Your details are ready. Connect an authentication service to sign in securely."
        : "Your property details are ready. Connect a backend to publish this listing." );
    }, 250);
  };

  return <div className="ny-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="ny-action-dialog" role="dialog" aria-modal="true" aria-labelledby="action-dialog-title">
      <button className="ny-dialog-close" onClick={onClose} aria-label="Close dialog"><X size={20}/></button>
      <span className="ny-dialog-icon">{isLogin ? <UserRound size={21}/> : <Plus size={22}/>}</span>
      <p className="eyebrow">NYUMBA</p>
      <h2 id="action-dialog-title">{isLogin ? "Welcome back" : "List your property"}</h2>
      <p className="ny-dialog-intro">{isLogin ? "Sign in to manage your Nyumba account." : "Share a few details and get your property ready to list."}</p>
      <form onSubmit={submit} className="ny-dialog-form">
        {!isLogin && <>
          <label>Property title<input required placeholder="e.g. Modern 2-bedroom apartment"/></label>
          <div className="ny-form-row"><label>Property type<select required defaultValue=""><option value="" disabled>Select type</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Listing type<select required defaultValue="Rent"><option>Rent</option><option>Sale</option></select></label></div>
          <div className="ny-form-row"><label>Location<input required placeholder="Town or neighbourhood"/></label><label>Price (KES)<input required type="number" min="1" placeholder="e.g. 25000"/></label></div>
          <label>Your name<input required autoComplete="name" placeholder="Full name"/></label>
          <label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com"/></label>
          <label>Phone number<input required type="tel" autoComplete="tel" placeholder="07xx xxx xxx"/></label>
          <label>Property description<textarea rows="3" placeholder="Describe the property"/></label>
        </>}
        {isLogin && <>
          <label>Email address<input required type="email" autoComplete="email" placeholder="Enter your email"/></label>
          <label>Password<input required type="password" autoComplete="current-password" placeholder="Enter your password" minLength={6}/></label>
        </>}
        <button className="ny-dialog-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : isLogin ? "Sign In" : "Submit Property Details"}</button>
        {message && <p className="ny-form-message" role="status">{message}</p>}
      </form>
    </section>
  </div>;
}

export default function Header({ properties = [], onCategory, onSearch, onPropertySelect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchRef = useRef(null);
  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const idQuery = /^(?:property\s*)?(?:id\s*#?\s*)?#?(\d+)$/i.exec(term);
    if (idQuery) return properties.filter(p => p.id === Number(idQuery[1])).slice(0, 5);
    return properties.filter(p => [p.title, p.id, p.location, p.category, p.type, p.description, p.area, `${p.beds} bedroom`, `${p.beds} bed`, `${p.beds} room`].join(" ").toLowerCase().includes(term)).slice(0, 5);
  }, [query, properties]);

  const submitSearch = (value = query) => {
    setQuery(value);
    setSuggestionsOpen(false);
    setMenuOpen(false);
    onSearch?.(value);
  };
  const selectCategory = (category) => {
    setMenuOpen(false);
    setSuggestionsOpen(false);
    onCategory?.(category);
  };
  const goTo = (id) => {
    setMenuOpen(false);
    setSuggestionsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onOutside = (event) => { if (searchRef.current && !searchRef.current.contains(event.target)) setSuggestionsOpen(false); };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return <>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" onClick={() => { setMenuOpen(false); onCategory?.(""); }} aria-label="Nyumba home"><span className="brand-icon"><House size={22}/></span><span>Nyumba</span></a>
        <div className="header-search-wrap" ref={searchRef}>
          <form className="header-search" onSubmit={(e) => { e.preventDefault(); submitSearch(); }} role="search">
            <Search size={19} aria-hidden="true"/><input aria-label="Search properties" value={query} onChange={e => { setQuery(e.target.value); setSuggestionsOpen(true); }} onFocus={() => setSuggestionsOpen(true)} placeholder="Search location, property ID, or listing title"/>
            {query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => { setQuery(""); setSuggestionsOpen(false); onSearch?.(""); }}><X size={16}/></button>}
          </form>
          {suggestionsOpen && query.trim() && <div className="header-suggestions">
            {suggestions.length ? suggestions.map(p => <button type="button" key={p.id} onClick={() => { setQuery(p.title); setSuggestionsOpen(false); onPropertySelect?.(p); }}><span className="suggestion-icon"><House size={16}/></span><span><strong>{p.title}</strong><small><MapPin size={12}/> {p.location} · {p.beds ? `${p.beds} bed` : p.category}</small></span><small className="suggestion-id">#{p.id}</small></button>) : <p>No matching properties. Press Enter to search all listings.</p>}
            <button className="suggestion-search-all" type="button" onClick={() => submitSearch()}>Search all properties for “{query}”</button>
          </div>}
        </div>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Property categories">
          {categories.map(category => <button key={category} onClick={() => selectCategory(category)}>{category === "Apartment" ? "Apartments" : category === "House" ? "Houses" : category === "Plot" ? "Plots" : category === "Villa" ? "Villas" : "Commercial"}</button>)}
        </nav>
        <div className="header-actions">
          <button className="sign-in" onClick={() => { setDialog("login"); setMenuOpen(false); }}>Sign In</button>
          <button className="list-property" onClick={() => { setDialog("list"); setMenuOpen(false); }}>List Property</button>
          <button className="menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
      {menuOpen && <div className="mobile-menu-panel">
        <p>Browse properties</p>
        {categories.map(category => <button key={category} onClick={() => selectCategory(category)}>{category === "Apartment" ? "Apartments" : category === "House" ? "Houses" : category === "Plot" ? "Plots" : category === "Villa" ? "Villas" : "Commercial"}</button>)}
        <button onClick={() => goTo("locations")}>Explore locations</button>
        <button onClick={() => goTo("about")}>About Nyumba</button>
        <button onClick={() => goTo("contact")}>Contact</button>
        <button className="mobile-sign-in" onClick={() => { setDialog("login"); setMenuOpen(false); }}>Sign In</button>
        <button className="mobile-list-property" onClick={() => { setDialog("list"); setMenuOpen(false); }}>List Property</button>
      </div>}
    </header>
    {dialog && <ActionDialog mode={dialog} onClose={() => setDialog(null)}/>}
  </>;
}
