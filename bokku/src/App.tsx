import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import AboutPage from "./pages/AboutPage";
import CareerPage from "./pages/CareerPage";
import ExploreArticlePage from "./pages/ExploreArticlePage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import LandlordAgenciesPage from "./pages/LandlordAgenciesPage";
import LocationsPage from "./pages/LocationsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import SupplierPage from "./pages/SupplierPage";
import WorkWithUsPage from "./pages/WorkWithUsPage";
import { products } from "./data/products";
import Footer from "./components/Footer";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? " active" : ""}`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchItems = useMemo(() => {
    const pages = [
      {
        label: "Home",
        path: "/",
        type: "Page",
        keywords: "home landing main bokku",
        content: "Welcome to the Bokku home page. This is the main landing area.",
      },
      {
        label: "All Products",
        path: "/products",
        type: "Page",
        keywords: "all products catalog list items inventory",
        content: "This is the All Products page where every item will be listed.",
      },
      {
        label: "Career",
        path: "/career",
        type: "Page",
        keywords: "career jobs roles hiring growth",
        content: "This is the Career page showing open roles and growth paths.",
      },
      {
        label: "Work With Us",
        path: "/work-with-us",
        type: "Page",
        keywords: "partners work with us collaboration suppliers",
        content: "This is the Work With Us page. Choose a partner path below.",
      },
      {
        label: "Supplier",
        path: "/work-with-us/supplier",
        type: "Partner",
        keywords: "supplier vendor inventory supply",
        content: "This is the Supplier page for vendors who want to work with Bokku.",
      },
      {
        label: "Landlord Agencies",
        path: "/work-with-us/landlord-agencies",
        type: "Partner",
        keywords: "landlord agencies property partnerships",
        content: "This is the Landlord Agencies page for property partnerships.",
      },
      {
        label: "Locations",
        path: "/locations",
        type: "Page",
        keywords: "locations areas cities coverage",
        content: "This is the Locations page listing our operating areas.",
      },
      {
        label: "About Us",
        path: "/about",
        type: "Page",
        keywords: "about story company bokku",
        content: "This is the About Us page telling the Bokku story.",
      },
      {
        label: "FAQ",
        path: "/faq",
        type: "Page",
        keywords: "faq support questions help",
        content: "Answers to the most common questions about shopping with Bokku.",
      },
    ];

    const productItems = products.map((product) => ({
      label: product.name,
      path: `/products/${product.slug}`,
      type: "Product",
      keywords: product.category,
      content: product.description,
    }));

    return [...pages, ...productItems];
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchItems
      .filter((item) => {
        const haystack =
          `${item.label} ${item.type} ${item.keywords} ${item.content}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [normalizedQuery, searchItems]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav
          className={`navbar${isMenuOpen ? " nav-open" : ""}`}
          aria-label="Primary"
        >
          <div className="nav-header">
            <div className="nav-brand">Bokku!</div>
            <button
              className="nav-toggle"
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
            </button>
          </div>
          <div className="nav-links">
            <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/products" onClick={closeMenu}>
              All Products
            </NavLink>
            <NavLink className={navLinkClass} to="/career" onClick={closeMenu}>
              Career
            </NavLink>
            <div className="nav-item has-submenu">
              <NavLink className={navLinkClass} to="/work-with-us" onClick={closeMenu}>
                Work With Us
              </NavLink>
              <div className="submenu" role="menu">
                <NavLink
                  className={navLinkClass}
                  to="/work-with-us/supplier"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  Supplier
                </NavLink>
                <NavLink
                  className={navLinkClass}
                  to="/work-with-us/landlord-agencies"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  Landlord Agencies
                </NavLink>
              </div>
            </div>
            <NavLink className={navLinkClass} to="/locations" onClick={closeMenu}>
              Locations
            </NavLink>
            <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>
              About Us
            </NavLink>
            <NavLink className={navLinkClass} to="/faq" onClick={closeMenu}>
              FAQ
            </NavLink>
          </div>
          <form
            className="nav-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search products, pages, content"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search the site"
            />
            <button type="submit">Search</button>
            {normalizedQuery && (
              <div className="search-results" role="listbox">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <NavLink
                      key={`${result.type}-${result.label}`}
                      className="search-result"
                      to={result.path}
                      onClick={() => {
                        setQuery("");
                        closeMenu();
                      }}
                    >
                      <span>{result.label}</span>
                      <span className="result-meta">{result.type}</span>
                    </NavLink>
                  ))
                ) : (
                  <div className="search-empty">No results found.</div>
                )}
              </div>
            )}
          </form>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
            <Route path="/work-with-us/supplier" element={<SupplierPage />} />
            <Route
              path="/work-with-us/landlord-agencies"
              element={<LandlordAgenciesPage />}
            />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/explore/:slug" element={<ExploreArticlePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
