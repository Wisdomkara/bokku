import { useState } from "react";
import { Link } from "react-router-dom";
import { addDiscountSubscriber } from "../lib/discountSubscribers";

const Footer = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [subscribeName, setSubscribeName] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [isSubscribeSubmitting, setIsSubscribeSubmitting] = useState(false);

  return (
    <footer className="bg-blue-950 text-white border-t-4 border-yellow-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Column 1 — Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-yellow-400 font-display">QUICK LINKS</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
            <Link to="/career" className="hover:text-yellow-400 transition-colors">Career</Link>
            <Link to="/locations" className="hover:text-yellow-400 transition-colors">Store Locations</Link>
            <Link to="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
            <Link to="/faq" className="hover:text-yellow-400 transition-colors">FAQs</Link>
          </div>
          <button
            type="button"
            className="mt-2 w-fit rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-bold text-blue-950 transition hover:bg-white hover:text-blue-900"
            onClick={() => setIsSubscribeOpen(true)}
          >
            Subscribe for alerts
          </button>
        </div>

        {/* Column 2 — Explore Bokku */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-yellow-400 font-display">EXPLORE BOKKU</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link to="/products?category=Bakery" className="hover:text-yellow-400 transition-colors">Bakery &amp; Deli</Link>
            <Link to="/products?category=Fruits+%26+Vegetables" className="hover:text-yellow-400 transition-colors">Fruits &amp; Vegetables</Link>
            <Link to="/products?category=Meat+%26+Poultry" className="hover:text-yellow-400 transition-colors">Meat &amp; Poultry</Link>
            <Link to="/products?category=Beverages" className="hover:text-yellow-400 transition-colors">Beverages</Link>
            <Link to="/products?category=Household" className="hover:text-yellow-400 transition-colors">Household Essentials</Link>
            <Link to="/products?topSelling=true" className="hover:text-yellow-400 transition-colors">Best Sellers</Link>
          </div>
        </div>

        {/* Column 3 — Work With Us */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-yellow-400 font-display">WORK WITH US</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <Link to="/work-with-us" className="hover:text-yellow-400 transition-colors">Partner Overview</Link>
            <Link to="/work-with-us/supplier" className="hover:text-yellow-400 transition-colors">Become a Supplier</Link>
            <Link to="/work-with-us/landlord-agencies" className="hover:text-yellow-400 transition-colors">Landlord &amp; Agencies</Link>
            <Link to="/career" className="hover:text-yellow-400 transition-colors">Join Our Team</Link>
            <Link to="/faq" className="hover:text-yellow-400 transition-colors">Help &amp; FAQs</Link>
          </div>
        </div>

        {/* Column 4 — Contact */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-yellow-400 font-display">CONTACT US</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-white">Head Office:</p>
              <p>7, Acme Road, Ogba, Ikeja, Lagos, Nigeria.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Telephone:</p>
              <p>+234 809 432 1111</p>
            </div>
            <div>
              <p className="font-semibold text-white">Find a Store:</p>
              <Link to="/locations" className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-white transition-colors font-semibold">
                <i className="fa-solid fa-map-location-dot" /> View all locations
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-blue-900/50 py-8 text-center text-xs text-slate-400">
        © Retail Supermarkets Nigeria Limited 2026. All Rights Reserved.
      </div>

      {isSubscribeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-scale-in">
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              onClick={() => setIsSubscribeOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
            
            <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              Join the club
            </span>
            <h3 className="mb-2 text-2xl font-bold text-blue-950 font-display">Subscribe for discount alerts</h3>
            <p className="mb-6 text-slate-600">
              Be the first to receive product discount alerts available in all stores.
            </p>
            
            <form
              className="flex flex-col gap-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setSubscribeError(null);
                setIsSubscribeSubmitting(true);
                try {
                  await addDiscountSubscriber({
                    fullName: subscribeName,
                    email: subscribeEmail,
                    source: "footer_modal",
                  });
                  setSubscribeName("");
                  setSubscribeEmail("");
                  setIsSubscribeOpen(false);
                } catch (error) {
                  setSubscribeError(
                    error instanceof Error ? error.message : "Unable to subscribe."
                  );
                } finally {
                  setIsSubscribeSubmitting(false);
                }
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-900">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={subscribeName}
                  onChange={(event) => setSubscribeName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-900">Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={subscribeEmail}
                  onChange={(event) => setSubscribeEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              {subscribeError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                  {subscribeError}
                </p>
              )}
              <button 
                type="submit" 
                disabled={isSubscribeSubmitting}
                className="mt-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubscribeSubmitting ? "Submitting..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
