import { useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryImage } from "../../data/categoryImages";
import { products } from "../../data/products";
import { addDiscountSubscriber } from "../../lib/discountSubscribers";

const TopSellingProducts = () => {
  const topSelling = products.filter((product) => product.isTopSelling);
  const [discountName, setDiscountName] = useState("");
  const [discountEmail, setDiscountEmail] = useState("");
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isDiscountSubmitting, setIsDiscountSubmitting] = useState(false);
  const [highlightedSlug, setHighlightedSlug] = useState(
    topSelling[0]?.slug ?? "",
  );

  const highlightedProduct =
    topSelling.find((product) => product.slug === highlightedSlug) ??
    topSelling[0];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-slate-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
          
            <h2 className="mt-5 text-4xl font-bold text-slate-950 md:text-3xl">
              High-demand picks, presented like <br /> a trusted dashboard.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Hover or focus a product to update the live preview. Each card is
              built for fast scanning, clear pricing, and confident movement.
            </p>
          </div>
          {highlightedProduct && (
            <div className="edge-glass rounded-[1.5rem] border border-blue-100 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-bold uppercase text-blue-700">
                Inspecting now
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-950">
                {highlightedProduct.name}
              </h3>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-slate-950">
                  {highlightedProduct.price}
                </span>
                <Link
                  to={`/products/${highlightedProduct.slug}`}
                  className="text-sm font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300/25"
                >
                  Open details
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topSelling.map((product) => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              onMouseEnter={() => setHighlightedSlug(product.slug)}
              onFocus={() => setHighlightedSlug(product.slug)}
              className="edge-glass group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] focus:outline-none focus:ring-4 focus:ring-blue-300/25"
            >
              <div className="aspect-square w-full overflow-hidden bg-blue-50">
                <img
                  src={getCategoryImage(product.category)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase text-blue-700">
                  {product.category}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-xl font-bold text-slate-950">
                    {product.price}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-yellow-300 group-hover:text-slate-950">
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="edge-glass mt-12 rounded-[1.5rem] border border-blue-100 bg-blue-50/80 px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase text-blue-700">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                Secured alerts
              </span>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                Get discount alerts
              </h3>
              <p className="mt-2 max-w-xl text-slate-600">
                Drop your name and email to receive best-seller discount updates.
              </p>
            </div>
            <form
              className="grid w-full gap-3 lg:w-auto lg:grid-cols-[180px_240px_auto]"
              onSubmit={async (event) => {
                event.preventDefault();
                setDiscountError(null);
                setIsDiscountSubmitting(true);
                try {
                  await addDiscountSubscriber({
                    fullName: discountName,
                    email: discountEmail,
                    source: "best_sellers",
                  });
                  setDiscountName("");
                  setDiscountEmail("");
                } catch (error) {
                  setDiscountError(
                    error instanceof Error
                      ? error.message
                      : "Unable to subscribe.",
                  );
                } finally {
                  setIsDiscountSubmitting(false);
                }
              }}
            >
              <label className="sr-only" htmlFor="discount-name">
                Your name
              </label>
              <input
                id="discount-name"
                type="text"
                placeholder="Your name"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                required
                value={discountName}
                onChange={(event) => setDiscountName(event.target.value)}
              />
              <label className="sr-only" htmlFor="discount-email">
                Your email
              </label>
              <input
                id="discount-email"
                type="email"
                placeholder="Your email"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                required
                value={discountEmail}
                onChange={(event) => setDiscountEmail(event.target.value)}
              />
              <button
                type="submit"
                disabled={isDiscountSubmitting}
                className="min-h-12 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_36px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDiscountSubmitting ? "Submitting..." : "Subscribe"}
              </button>
              {discountError && (
                <p
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 lg:col-span-3"
                  role="alert"
                >
                  {discountError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
