import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
import { searchItems } from "./data/searchIndex";
import Footer from "./components/Footer";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70",
    isActive
      ? "bg-white/10 text-yellow-300 shadow-[inset_0_0_0_1px_rgba(253,224,71,0.35)]"
      : "text-white/90 hover:-translate-y-0.5 hover:text-yellow-300",
  ].join(" ");

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, search, hash]);

  return null;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

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
        <ScrollToTop />
        <nav
          className="sticky top-0 z-30 border-b border-white/10 bg-blue-700 text-white shadow-[0_10px_30px_rgba(11,31,74,0.35)] backdrop-blur"
          aria-label="Primary"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:gap-6 md:px-8">
            <div className="flex w-full items-center justify-between gap-3 md:w-auto">
            <NavLink
              className="text-xl font-semibold tracking-wide text-yellow-300"
              to="/"
              onClick={closeMenu}
            >
              Bokku!
            </NavLink>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70 md:hidden"
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
              </button>
            </div>

            <div
              className={`w-full flex-col gap-1 md:flex md:w-auto md:flex-row md:items-center md:gap-1 ${
                isMenuOpen ? "flex" : "hidden"
              }`}
            >
              <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink className={navLinkClass} to="/products" onClick={closeMenu}>
                All Products
              </NavLink>
              <NavLink className={navLinkClass} to="/career" onClick={closeMenu}>
                Career
              </NavLink>

              <div className="relative md:group">
                <NavLink className={navLinkClass} to="/work-with-us" onClick={closeMenu}>
                  Work With Us
                </NavLink>
                <div className="mt-2 hidden flex-col gap-1 rounded-xl bg-white/10 p-2 md:absolute md:left-0 md:top-full md:mt-3 md:min-w-[200px] md:bg-slate-900 md:shadow-xl md:group-hover:flex md:group-focus-within:flex">
                  <NavLink
                    className={({ isActive }) =>
                      [
                        "rounded-lg px-3 py-2 text-sm font-medium transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70",
                        isActive
                          ? "bg-white/15 text-yellow-300"
                          : "text-white/90 hover:bg-white/10 hover:text-yellow-300",
                      ].join(" ")
                    }
                    to="/work-with-us/supplier"
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    Supplier
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      [
                        "rounded-lg px-3 py-2 text-sm font-medium transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70",
                        isActive
                          ? "bg-white/15 text-yellow-300"
                          : "text-white/90 hover:bg-white/10 hover:text-yellow-300",
                      ].join(" ")
                    }
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
              className="relative w-full md:ml-auto md:w-auto"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                <input
                  type="search"
                  placeholder="Search products, pages, content"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search the site"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none md:min-w-[220px]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
                >
                  Search
                </button>
              </div>

              {normalizedQuery && (
                <div className="absolute left-0 right-0 top-full z-40 mt-2 flex flex-col gap-1 rounded-2xl border border-slate-900/5 bg-white p-2 text-slate-900 shadow-[0_18px_40px_rgba(11,18,41,0.2)]">
                  {searchResults.length ? (
                    searchResults.map((result) => (
                      <NavLink
                        key={`${result.type}-${result.label}`}
                        to={result.path}
                        onClick={() => {
                          setQuery("");
                          closeMenu();
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
                      >
                        <span>{result.label}</span>
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {result.type}
                        </span>
                      </NavLink>
                    ))
                  ) : (
                    <div className="rounded-xl px-3 py-2 text-sm text-slate-600">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
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
