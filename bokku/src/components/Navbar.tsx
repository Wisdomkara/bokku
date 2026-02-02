import { useState, useMemo, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { searchItems } from "../data/searchIndex";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const { openCart, cartItems } = useCart();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
  }, [normalizedQuery]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full
    ${
      isActive
        ? "text-primary bg-primary/10 font-semibold"
        : "text-slate-600 hover:text-primary hover:bg-slate-50"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all
    ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/25"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-blue-900/10 bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-tight text-slate-900 transition hover:opacity-80"
          >
            Bokku<span className="text-primary">.</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/career" className={navLinkClass}>Career</NavLink>
            
            <div className="group relative">
              <NavLink to="/work-with-us" className="relative px-4 py-2 text-sm font-bold text-blue-700 transition-colors duration-200 rounded-full hover:bg-yellow-50">
                With Us <i className="fa-solid fa-chevron-down ml-1 text-xs opacity-50 group-hover:rotate-180 transition-transform" />
              </NavLink>
              
              <div className="absolute top-full left-0 mt-2 w-48 origin-top-left scale-95 opacity-0 invisible flex-col gap-1 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-hover:visible">
                <NavLink to="/work-with-us/supplier" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors">
                  Supplier
                </NavLink>
                <NavLink to="/work-with-us/landlord-agencies" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors">
                  Landlords
                </NavLink>
              </div>
            </div>

            <NavLink to="/locations" className={navLinkClass}>Locations</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop */}
          <div className="relative hidden md:block group">
            <div className={`flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50/50 px-4 py-2 transition-all duration-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 ${query ? 'w-72' : 'w-64 hover:w-72'}`}>
              <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-red-500">
                  <i className="fa-solid fa-times" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {normalizedQuery && (
              <div className="absolute right-0 top-full mt-4 w-96 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-slate-900/5 animate-scale-in">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <NavLink
                      key={`${result.type}-${result.label}`}
                      to={result.path}
                      onClick={() => setQuery("")}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <i className={`fa-solid ${result.type === 'product' ? 'fa-box' : 'fa-file-lines'}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{result.label}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">{result.type}</div>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <i className="fa-regular fa-face-frown text-2xl mb-2 opacity-50" />
                    <p className="text-sm">No results found for "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account */}
          <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-primary hover:text-primary">
             <i className="fa-regular fa-user" />
          </button>
          
          {/* Cart */}
          <button 
            onClick={openCart}
            className="hidden md:flex relative h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
          >
             <i className="fa-solid fa-cart-shopping" />
             {cartItems.length > 0 && (
               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black ring-2 ring-white">
                 {cartItems.length}
               </span>
             )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-colors active:scale-95"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[80px] z-30 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden
        ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex h-full flex-col p-6 overflow-y-auto">
          {/* Mobile Search */}
          <div className="relative mb-6">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-base font-medium text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
            {/* Mobile Search Results could go here if needed */}
          </div>

          <div className="flex flex-col space-y-2">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-house w-6 opacity-70" /> Home
            </NavLink>
            <NavLink to="/products" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-bag-shopping w-6 opacity-70" /> Products
            </NavLink>
            <NavLink to="/career" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-briefcase w-6 opacity-70" /> Career
            </NavLink>
            <NavLink to="/work-with-us" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-handshake w-6 opacity-70" /> Work With Us
            </NavLink>
            <div className="pl-12 flex flex-col gap-2 border-l border-slate-100 ml-6">
                 <NavLink to="/work-with-us/supplier" onClick={() => setIsMenuOpen(false)} className="text-slate-600 py-2 hover:text-primary">Supplier</NavLink>
                 <NavLink to="/work-with-us/landlord-agencies" onClick={() => setIsMenuOpen(false)} className="text-slate-600 py-2 hover:text-primary">Landlords</NavLink>
            </div>
            
            <NavLink to="/locations" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-map-location-dot w-6 opacity-70" /> Locations
            </NavLink>
             <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-circle-info w-6 opacity-70" /> About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
