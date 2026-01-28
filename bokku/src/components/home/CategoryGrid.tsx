import { Link } from "react-router-dom";
import { getCategoryImage } from "../../data/categoryImages";
import { products } from "../../data/products";

type CategoryInfo = {
  name: string;
  count: number;
  image: string;
};

const CategoryGrid = () => {
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

  return (
    <section
      id="categories"
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-6 pb-4 pt-6 md:px-12 lg:px-16 mt-5"
    >
      <div className="mx-auto w-full max-w-7xl xl:max-w-300">
        <div className="reveal mx-auto mb-6 flex max-w-3xl flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl text-center">
            Browse by category
          </h2>
          <p className="text-sm leading-6 text-slate-700 md:text-base text-center">
            Pick a category and see every product within that collection.
          </p>
        </div>

        <div className="grid place-items-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="reveal group flex min-h-65 w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-slate-900/5 bg-white p-5 text-center text-slate-900 shadow-[0_18px_40px_rgba(11,18,41,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(11,18,41,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
            >
              <div className="h-70 w-70 overflow-hidden rounded-xl bg-slate-900 mx-auto">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <span className="text-base font-semibold text-slate-900">
                {category.name}
              </span>

              <span className="text-sm font-medium text-slate-600">
                {category.count} items
              </span>

              <span className="mt-auto inline-flex items-center rounded-full bg-yellow-300 px-3 py-1.5 text-xs font-semibold text-slate-900 transition group-hover:bg-yellow-200 mx-auto">
                View products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
