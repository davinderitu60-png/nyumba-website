import { House, Facebook, Instagram, Music2, MapPin, Phone, Mail } from "lucide-react";
export default function Footer() {
  return <footer className="footer" id="contact"><div className="footer-grid section-wrap">
    <div className="footer-brand" id="about"><a className="brand footer-logo" href="#top"><span className="brand-icon"><House size={20}/></span><span>nyumba</span></a><p>Making the search for a place to call home simple, clear and stress-free.</p></div>
    <div><h4>Quick Navigation</h4><a href="#top">Homepage</a><a href="#properties">Properties</a><a href="#locations">Locations</a><a href="#about">About Us</a><a href="mailto:hello@nyumba.co.ke">Sign In</a></div>
    <div><h4>Office & Contact</h4><p><MapPin size={14}/> Sacco Plaza, 2nd Floor, Room 16, Thika</p><a href="tel:0717400713"><Phone size={14}/> 0717400713</a><a href="mailto:hello@nyumba.co.ke"><Mail size={14}/> hello@nyumba.co.ke</a></div>
    <div><h4>Follow Us</h4><a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={14}/> Facebook</a><a href="https://tiktok.com" target="_blank" rel="noreferrer"><Music2 size={14}/> TikTok</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={14}/> Instagram</a></div>
  </div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Nyumba. All rights reserved.</span><span>Nyumba Real Estate · All rights reserved.</span></div></footer>;
}