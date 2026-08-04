import { Link } from "react-router-dom";
import { useState } from "react";
import { getCategoryImage } from "../../data/categoryImages";
import { products } from "../../data/products";

type CategoryInfo = {
  name: string;
  count: number;
  image: string;
};

const CategoryGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = products.reduce<CategoryInfo[]>((acc, product) => {
    const existing = acc.find((item) => item.name === product.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        name: product.category,
        count: 1,
        image: getCategoryImage(product.category),
      });
    }
    return acc;
  }, []);
  const featuredCategory =
    categories.find((category) => category.name === activeCategory) ??
    categories[0];

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-slate-50 px-4 py-24 text-slate-950 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-700">
              <i className="fa-solid fa-layer-group" aria-hidden="true" />
              Department grid
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Browse by category with a cleaner scan-first layout.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Product groups now behave like secure tiles: clear counts,
              stronger focus states, and glass highlights that move from the
              container edges.
            </p>
          </div>
          {featuredCategory && (
            <div className="edge-glass rounded-[1.5rem] border border-blue-100 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-bold uppercase text-blue-700">
                Active scan
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-950">
                {featuredCategory.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {featuredCategory.count} verified product
                {featuredCategory.count === 1 ? "" : "s"} in this department.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              onMouseEnter={() => setActiveCategory(category.name)}
              onFocus={() => setActiveCategory(category.name)}
              className="edge-glass group relative flex h-80 flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300/70 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] focus:outline-none focus:ring-4 focus:ring-yellow-300/25"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(15,23,42,0.18)_42%,rgba(15,23,42,0.82)_100%)] transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/40 bg-white/75 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur-lg">
                    Sector 0{index + 1}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-blue-700 backdrop-blur-lg transition group-hover:bg-yellow-300 group-hover:text-slate-950">
                    <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true" />
                  </span>
                </div>
                <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <div className="mt-3 flex items-center gap-3 text-sm font-medium text-slate-200">
                    <span>{category.count} Products</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                    <span>Open category</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
