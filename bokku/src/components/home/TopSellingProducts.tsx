import { Link } from "react-router-dom";
import { products } from "../../data/products";

const TopSellingProducts = () => {
  const topSelling = products.filter((product) => product.isTopSelling);

  return (
    <section className="top-selling">
      <div className="top-selling__header reveal">
        <h2>Top selling products</h2>
        <p>These are the items customers love most right now.</p>
      </div>
      <div className="top-selling__grid">
        {topSelling.map((product) => (
          <Link
            key={product.slug}
            className="top-selling__card reveal"
            to={`/products/${product.slug}`}
          >
            <div className="top-selling__image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="top-selling__body">
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <span>{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
