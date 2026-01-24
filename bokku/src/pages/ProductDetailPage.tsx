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

  return (
    <PageLayout title={product.name} description={product.category}>
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <div className="price">{product.price}</div>
          <p>{product.description}</p>
          <div className="inline-links">
            <Link to="/products">Browse more products</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
