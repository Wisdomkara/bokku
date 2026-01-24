import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";

type PageProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const Page = ({ title, description, children }: PageProps) => {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? " active" : ""}`;

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar" aria-label="Primary">
          <div className="nav-brand">Bokku</div>
          <div className="nav-links">
            <NavLink className={navLinkClass} to="/" end>
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/products">
              All Products
            </NavLink>
            <NavLink className={navLinkClass} to="/career">
              Career
            </NavLink>
            <div className="nav-item has-submenu">
              <NavLink className={navLinkClass} to="/work-with-us">
                Work With Us
              </NavLink>
              <div className="submenu" role="menu">
                <NavLink
                  className={navLinkClass}
                  to="/work-with-us/supplier"
                  role="menuitem"
                >
                  Supplier
                </NavLink>
                <NavLink
                  className={navLinkClass}
                  to="/work-with-us/landlord-agencies"
                  role="menuitem"
                >
                  Landlord Agencies
                </NavLink>
              </div>
            </div>
            <NavLink className={navLinkClass} to="/locations">
              Locations
            </NavLink>
            <NavLink className={navLinkClass} to="/about">
              About Us
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Page
                  title="Home"
                  description="Welcome to the Bokku home page. This is the main landing area."
                />
              }
            />
            <Route
              path="/products"
              element={
                <Page
                  title="All Products"
                  description="This is the All Products page where every item will be listed."
                />
              }
            />
            <Route
              path="/career"
              element={
                <Page
                  title="Career"
                  description="This is the Career page showing open roles and growth paths."
                />
              }
            />
            <Route
              path="/work-with-us"
              element={
                <Page
                  title="Work With Us"
                  description="This is the Work With Us page. Choose a partner path below."
                >
                  <div className="inline-links">
                    <Link to="/work-with-us/supplier">Supplier</Link>
                    <Link to="/work-with-us/landlord-agencies">Landlord Agencies</Link>
                  </div>
                </Page>
              }
            />
            <Route
              path="/work-with-us/supplier"
              element={
                <Page
                  title="Supplier"
                  description="This is the Supplier page for vendors who want to work with Bokku."
                />
              }
            />
            <Route
              path="/work-with-us/landlord-agencies"
              element={
                <Page
                  title="Landlord Agencies"
                  description="This is the Landlord Agencies page for property partnerships."
                />
              }
            />
            <Route
              path="/locations"
              element={
                <Page
                  title="Locations"
                  description="This is the Locations page listing our operating areas."
                />
              }
            />
            <Route
              path="/about"
              element={
                <Page
                  title="About Us"
                  description="This is the About Us page telling the Bokku story."
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
