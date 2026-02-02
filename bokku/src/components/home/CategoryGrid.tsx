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
    <section id="categories" className="py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950 md:text-4xl font-display">
            Browse by Category
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our curated collection of premium essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative flex h-80 flex-col overflow-hidden rounded-3xl bg-blue-50 transition-all hover:shadow-xl"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
              </div>

              <div className="relative mt-auto p-8 text-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold font-display">{category.name}</h3>
                <div className="mt-2 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white/90">
                    {category.count} Products
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-950">
                    <i className="fa-solid fa-arrow-right text-xs" />
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
