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

  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-950 md:text-4xl font-display">
              Best Sellers
            </h2>
            <p className="mt-2 text-slate-600">
              Customer favorites you don't want to miss.
            </p>
          </div>
          <Link
            to="/products?topSelling=true"
            className="group flex items-center gap-2 font-semibold text-primary transition hover:text-primary-dark"
          >
            View all <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topSelling.map((product) => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square w-full overflow-hidden bg-blue-50">
                <img
                  src={getCategoryImage(product.category)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-blue-950 line-clamp-1">
                  {product.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-950">
                    {product.price}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-950 transition group-hover:bg-primary group-hover:text-white">
                    <i className="fa-solid fa-arrow-right text-sm" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-8 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-950">
                Get discount alerts
              </h3>
              <p className="mt-2 text-slate-600">
                Drop your name and email to receive best-seller discount updates.
              </p>
            </div>
            <form
              className="flex w-full flex-col gap-3 md:w-auto md:flex-row"
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
                    error instanceof Error ? error.message : "Unable to subscribe."
                  );
                } finally {
                  setIsDiscountSubmitting(false);
                }
              }}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 md:w-56"
                required
                value={discountName}
                onChange={(event) => setDiscountName(event.target.value)}
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 md:w-64"
                required
                value={discountEmail}
                onChange={(event) => setDiscountEmail(event.target.value)}
              />
              <button
                type="submit"
                disabled={isDiscountSubmitting}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDiscountSubmitting ? "Submitting..." : "Subscribe"}
              </button>
              {discountError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 md:ml-2">
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
