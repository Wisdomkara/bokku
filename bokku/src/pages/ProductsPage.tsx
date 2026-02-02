import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import PageLayout from "./PageLayout";
import { getCategoryImage } from "../data/categoryImages";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const isTopSelling = searchParams.get("topSelling") === "true";
  
  const categoryOptions = useMemo(() => {
    const seen = new Set<string>();
    return products
      .map((product) => product.category)
      .filter((category) => {
        if (seen.has(category)) return false;
        seen.add(category);
        return true;
      });
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : isTopSelling
      ? products.filter((product) => product.isTopSelling)
      : products;

  return (
    <PageLayout
      title={activeCategory ? activeCategory : isTopSelling ? "Best Sellers" : "All Products"}
      description="Browse our collection of high-quality essentials, from pantry staples to household treats."
    >
      {/* Category Pills */}
      <div className="sticky top-20 z-10 -mx-4 mb-8 overflow-x-auto bg-white/80 py-4 px-4 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex gap-2">
          <Link
            to="/products"
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              !activeCategory && !isTopSelling
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Products
          </Link>
          {categoryOptions.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.slug}
            to={`/products/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl border border-slate-100"
          >
            <div className="aspect-square w-full overflow-hidden bg-slate-50">
              <img
                src={product.image || getCategoryImage(product.category)}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider line-clamp-1">
                {product.category}
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900 line-clamp-2">
                {product.name}
              </h3>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">
                  {product.price}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition group-hover:bg-primary group-hover:text-white">
                  <i className="fa-solid fa-plus text-xs" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
         <div className="py-20 text-center">
            <i className="fa-regular fa-folder-open text-4xl text-slate-300 mb-4" />
            <p className="text-slate-500">No products found in this category.</p>
            <Link to="/products" className="text-primary font-semibold mt-2 inline-block hover:underline">Clear filters</Link>
         </div>
      )}
    </PageLayout>
  );
};

export default ProductsPage;
