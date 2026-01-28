import { Link, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import { products } from "../data/products";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <PageLayout
        title="Product not found"
        description="We couldn't find the product you requested."
      >
        <div className="inline-links">
          <Link to="/products">Back to products</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );

  const categories = Array.from(
    new Set(products.map((item) => item.category)),
  ).filter((category) => category !== product.category);

  return (
    <PageLayout
      title={product.name}
      description={product.category}
      className="page--hero"
    >
      <div className="hero-banner">
        <div className="hero-banner__image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="page-body">
        <div className="hero-text">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="product-info-panel">
          <div className="price">{product.price}</div>
          <div className="inline-links">
            <Link to="/products">Browse more products</Link>
          </div>
        </div>

        <section className="product-related">
          <div className="product-related__header">
            <h3>More in {product.category}</h3>
            <p>Other products you might like from this category.</p>
          </div>
          <div className="product-related__grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  className="product-card"
                  to={`/products/${item.slug}`}
                >
                  <div className="product-card__image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="product-card__body">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <span>{item.price}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="product-related__empty">
                No other products in this category yet.
              </div>
            )}
          </div>
        </section>

        <section className="product-categories">
          <div className="product-categories__header">
            <h3>Explore other categories</h3>
            <p>Jump into another aisle to discover more.</p>
          </div>
          <div className="product-categories__grid">
            {categories.map((category) => (
              <Link
                key={category}
                className="product-category-card"
                to={`/products?category=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
