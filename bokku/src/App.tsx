import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[var(--page-bg)] font-sans text-[var(--text-main)] antialiased selection:bg-primary/20 selection:text-primary">
        <ScrollToTop />
        <Navbar />

        <main className="flex-1 w-full">
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
