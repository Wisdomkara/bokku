import { useState, useMemo, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { searchItems } from "../data/searchIndex";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileWorkOpen, setMobileWorkOpen] = useState(true); // Default open on mobile for better visibility
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const prevPathRef = useRef(location.pathname);

  // Close menu on route change
  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;
    if (!isMenuOpen) return;
    const timeoutId = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          focusableSelector,
        ) ?? [],
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const focusFirst = () => {
      const list = focusables();
      if (list.length > 0) list[0].focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const prevActive = document.activeElement as HTMLElement | null;
    const toggleEl = mobileToggleRef.current;
    requestAnimationFrame(focusFirst);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (prevActive && document.contains(prevActive)) {
        prevActive.focus();
      } else {
        toggleEl?.focus();
      }
    };
  }, [isMenuOpen]);

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
    `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
    ${
      isActive
        ? "text-primary bg-primary/10 font-semibold shadow-sm shadow-blue-500/10"
        : "text-slate-600 hover:text-primary hover:bg-slate-50"
    }`;

  // Mobile link class - larger touch targets
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-4 text-base font-semibold transition-colors
    ${isActive ? "text-[#0000ff]" : "text-[#0000ff] hover:text-[#0000ff]"}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        {/* Brand & Desktop Nav   Container */}
        <div className="flex items-center gap-8">
          {/* Brand */}
          <NavLink
            to="/"
            className="group relative flex items-center gap-2 py-1 transition-transform hover:scale-105"
            aria-label="BOKKU! Mart"
          >
            <div className="relative">
              <div className="absolute inset-0 translate-y-1 rounded-full bg-primary/20 blur opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <img
                src="/categoryimages/bo.jpg"
                alt="BOKKU! Mart"
                className="relative h-6 w-auto max-w-20 object-contain"
              />
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/career" className={navLinkClass}>
              Career
            </NavLink>

            <div className="group relative">
              <NavLink
                to="/work-with-us"
                className="relative px-4 py-2 text-sm font-bold text-primary transition-all duration-300 rounded-full hover:bg-primary/5 hover:shadow-sm"
              >
                With Us{" "}
                <i className="fa-solid fa-chevron-down ml-1 text-[10px] opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </NavLink>

              <div className="absolute top-full left-0 mt-2 w-52 origin-top-left scale-95 opacity-0 invisible flex-col gap-1 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl p-2 shadow-xl ring-1 ring-slate-900/5 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-hover:visible">
                <NavLink
                  to="/work-with-us/supplier"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-primary">
                    <i className="fa-solid fa-truck-ramp-box" />
                  </div>
                  Supplier
                </NavLink>
                <NavLink
                  to="/work-with-us/landlord-agencies"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-primary">
                    <i className="fa-solid fa-building-user" />
                  </div>
                  Landlords
                </NavLink>
              </div>
            </div>

            <NavLink to="/locations" className={navLinkClass}>
              Locations
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>
        </div>

        {/* Mobile Search (Centered) */}
        <div className="flex-1 max-w-70 lg:hidden">
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Desktop Search */}
          <div className="relative hidden lg:block group">
            <div
              className={`flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50/50 px-4 py-2 transition-all duration-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 ${query ? "w-80" : "w-64 hover:w-72"}`}
            >
              <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <i className="fa-solid fa-times" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {normalizedQuery && (
              <div className="absolute right-0 top-full mt-4 w-96 origin-top-right rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-200">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <NavLink
                      key={`${result.type}-${result.label}`}
                      to={result.path}
                      onClick={() => setQuery("")}
                      className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <i
                          className={`fa-solid ${result.type.toLowerCase() === "product" ? "fa-box" : "fa-file-lines"}`}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {result.label}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-0.5 opacity-80">
                          {result.type}
                        </div>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                      <i className="fa-solid fa-magnifying-glass text-xl" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                      No results found
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      We couldn't find anything for "{query}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsMenuOpen((open) => !open);
            }}
            ref={mobileToggleRef}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-colors active:scale-95 z-50 relative"
          >
            <i
              className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars text-lg"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="pointer-events-none fixed inset-x-0 top-20 z-40 lg:hidden">
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="pointer-events-auto mx-4 flex flex-col rounded-2xl border border-slate-100 bg-white shadow-2xl animate-in slide-in-from-top-4 duration-200"
          >
            <div className="divide-y divide-slate-100">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileWorkOpen(false);
                }}
              >
                <div className="w-8 text-center">
                  <i className="fa-solid fa-house opacity-70" />
                </div>
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={mobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileWorkOpen(false);
                }}
              >
                <div className="w-8 text-center">
                  <i className="fa-solid fa-bag-shopping opacity-70" />
                </div>
                Products
              </NavLink>

              <NavLink
                to="/career"
                className={mobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileWorkOpen(false);
                }}
              >
                <div className="w-8 text-center">
                  <i className="fa-solid fa-briefcase opacity-70" />
                </div>
                Career
              </NavLink>

              {/* Mobile Dropdown Section */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setMobileWorkOpen((v) => !v)}
                  aria-expanded={mobileWorkOpen}
                  className="flex w-full items-center justify-between px-4 py-4 text-base font-semibold text-[#0000ff]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center">
                      <i className="fa-solid fa-handshake text-primary opacity-80" />
                    </div>
                    Work With Us
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${
                      mobileWorkOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileWorkOpen && (
                  <div className="flex flex-col pb-2">
                    <NavLink
                      to="/work-with-us/supplier"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileWorkOpen(false);
                      }}
                      className="flex items-center gap-4 px-12 py-3 text-sm font-semibold text-[#0000ff]"
                    >
                      Supplier
                    </NavLink>

                    <NavLink
                      to="/work-with-us/landlord-agencies"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileWorkOpen(false);
                      }}
                      className="flex items-center gap-4 px-12 py-3 text-sm font-semibold text-[#0000ff]"
                    >
                      Landlords
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/locations"
                className={mobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileWorkOpen(false);
                }}
              >
                <div className="w-8 text-center">
                  <i className="fa-solid fa-map-location-dot opacity-70" />
                </div>
                Locations
              </NavLink>

              <NavLink
                to="/about"
                className={mobileNavLinkClass}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileWorkOpen(false);
                }}
              >
                <div className="w-8 text-center">
                  <i className="fa-solid fa-circle-info opacity-70" />
                </div>
                About
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
