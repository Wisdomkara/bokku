import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import PageLayout from "./PageLayout";

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
      title="All Products"
      description="This is the All Products page where every item will be listed."
    >
      {activeCategory && (
        <div className="category-filter-pill">
          Viewing category: <span>{activeCategory}</span>
        </div>
      )}
      {isTopSelling && !activeCategory && (
        <div className="category-filter-pill">
          Viewing: <span>Top selling</span>
        </div>
      )}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            key={product.slug}
            className="product-card"
            to={`/products/${product.slug}`}
          >
            <div className="product-card__image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-card__body">
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <span>{product.price}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="products-category-suggestions">
        <div className="products-category-suggestions__header">
          <h3>Search by category</h3>
          <p>Browse by aisle to discover more of what you need.</p>
        </div>
        <div className="products-category-suggestions__chips">
          <Link
            to="/products"
            className={`products-category-chip ${
              !activeCategory && !isTopSelling ? "is-active" : ""
            }`}
            aria-current={!activeCategory && !isTopSelling ? "page" : undefined}
          >
            All products
          </Link>
          {categoryOptions.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`products-category-chip ${
                activeCategory === category ? "is-active" : ""
              }`}
              aria-current={activeCategory === category ? "page" : undefined}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
