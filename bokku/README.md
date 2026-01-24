# Bokku Navigation + Routing

This project uses React + TypeScript + Vite and adds a full navigation bar with client-side routing and distinct pages.

## What each file does

### `src/main.tsx`
- Bootstraps the React app and mounts `<App />` inside `#root`.
- Imports `src/index.css` so all global styles are applied.

### `src/App.tsx`
- Sets up the router with `BrowserRouter`, `Routes`, and `Route`.
- Defines a reusable `Page` component that prints a page title and content so each route clearly proves which page is open.
- Builds the navbar:
  - **Home**
  - **All Products**
  - **Career**
  - **Work With Us** (parent route)
    - **Supplier** (sub-link)
    - **Landlord Agencies** (sub-link)
  - **Locations**
  - **About Us**
- Uses `NavLink` with a helper (`navLinkClass`) so the active route gets an `active` class automatically.
- Adds inline links on the **Work With Us** page so users can reach the subpages from content too.

### `src/index.css`
- Defines CSS variables for colors and reuses them throughout.
- Sets a **dark blue** navbar background and **white** text.
- Applies **yellow** styling for hover and active states.
- Adds motion for:
  - **hover** (`transform` + color change),
  - **active/click** (`:active` scale + shadow),
  - **active route** (yellow + small pop animation).
- Styles the dropdown submenu for **Work With Us** and a responsive layout for smaller screens.

## Routes summary

| Route | Page title | Purpose |
|------|------------|---------|
| `/` | Home | Main landing page |
| `/products` | All Products | Product listing page |
| `/career` | Career | Jobs and growth |
| `/work-with-us` | Work With Us | Partner overview |
| `/work-with-us/supplier` | Supplier | Supplier partnerships |
| `/work-with-us/landlord-agencies` | Landlord Agencies | Property partnerships |
| `/locations` | Locations | Operating regions |
| `/about` | About Us | Company story |

## Running the app

```bash
npm install
npm run dev
```
