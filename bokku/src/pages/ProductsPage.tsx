import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import PageLayout from "./PageLayout";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
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
    </PageLayout>
  );
};

export default ProductsPage;
