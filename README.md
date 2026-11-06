# Nyumba Real Estate Website

A responsive React + Vite real-estate website based on the supplied reference video.

## Run locally
1. Install Node.js (LTS) if it is not already installed.
2. Extract this ZIP.
3. Open the extracted `nyumba-website` folder in VS Code.
4. Open the terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address printed by Vite (usually http://localhost:5173).

## Included
- Responsive header and mobile hamburger menu
- Hero section with property search
- Search filters for location, minimum/maximum price and property type
- Six sample property cards
- Price sorting and favourites
- Property detail modal
- Call and WhatsApp agent links
- Explore-by-location cards
- Footer and contact information

## Customize
- Edit property details and image URLs in `src/data/properties.js`.
- Update contact phone and office details in `src/components/Footer.jsx` and `src/components/Houses.jsx`.
- The current listings are sample content for the design; replace them with your actual listings before publishing.

Images are loaded from Unsplash and therefore require an internet connection.

## Header and navigation updates

The header now follows the supplied Nyumba reference and includes:
- Responsive desktop navigation and a mobile/tablet hamburger menu.
- Working category filters for Apartments, Houses, Villas, Commercial and Plots.
- Global property search across the supplied listing data (title, location, ID, category, listing type, description, area and bedroom/bathroom counts), with live suggestions.
- A Sign In dialog with email and password fields.
- A List Property dialog with the core property submission fields.

### Important integration note
This repository currently contains static sample property data and no authentication, database, or property-submission API. The Sign In and List Property dialogs validate and collect form input in the browser, but they deliberately do not claim to authenticate users or publish listings. Connect your real authentication provider and listing API before using those workflows in production. Villa navigation is wired correctly but will show an empty state until Villa listings are added to `src/data/properties.js`.
