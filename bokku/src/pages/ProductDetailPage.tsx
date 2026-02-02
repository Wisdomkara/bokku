import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { getCategoryImage } from "../data/categoryImages";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 font-display">Product not found</h1>
        <p className="mb-8 text-slate-600">We couldn't find the product you requested.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <i className="fa-solid fa-arrow-left" /> Back to products
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  ).slice(0, 4);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1) setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.slug, // using slug as id for now
        name: product.name,
        price: product.price,
        image: product.image || getCategoryImage(product.category),
        category: product.category,
      }, quantity);
      // Optionally reset quantity or show toast
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <i className="fa-solid fa-chevron-right mx-2 text-xs opacity-50" />
        <Link to="/products" className="hover:text-slate-900">Products</Link>
        <i className="fa-solid fa-chevron-right mx-2 text-xs opacity-50" />
        <span className="font-medium text-slate-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-100 lg:aspect-[4/5]">
          <img
            src={product.image || getCategoryImage(product.category)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0 lg:sticky lg:top-24 h-fit">
          <div className="mb-6">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {product.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl font-display">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-3xl font-bold text-slate-900">{product.price}</p>
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star-half-stroke" />
                <span className="ml-2 text-slate-500">(4.8)</span>
              </div>
            </div>
          </div>

          <div className="prose prose-slate mb-8 max-w-none text-slate-600">
            <p>{product.description}</p>
            <p>
              Experience premium quality with our carefully selected {product.name.toLowerCase()}. 
              Perfect for your daily needs, sourced from trusted partners to ensure satisfaction.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center rounded-full border border-slate-200">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="h-12 w-12 text-slate-500 hover:text-slate-900 transition"
              >
                <i className="fa-solid fa-minus" />
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly 
                className="h-12 w-12 text-center text-slate-900 font-semibold focus:outline-none"
              />
              <button 
                onClick={() => handleQuantityChange(1)}
                className="h-12 w-12 text-slate-500 hover:text-slate-900 transition"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-blue-950 px-8 py-3 text-base font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 hover:-translate-y-1 active:scale-95"
            >
              Add to Cart
            </button>
            
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">
              <i className="fa-regular fa-heart" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <i className="fa-solid fa-truck-fast" />
              </div>
              <div className="text-sm">
                <span className="block font-semibold text-slate-900">Fast Delivery</span>
                <span className="text-slate-500">2-3 business days</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                <i className="fa-solid fa-shield-halved" />
              </div>
              <div className="text-sm">
                <span className="block font-semibold text-slate-900">Quality Guarantee</span>
                <span className="text-slate-500">Verified authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-slate-100 pt-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 font-display">You might also like</h2>
            <Link to="/products" className="text-sm font-semibold text-primary hover:text-primary-dark">
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                to={`/products/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-50">
                  <img
                    src={item.image || getCategoryImage(item.category)}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider line-clamp-1">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      {item.price}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition group-hover:bg-primary group-hover:text-white">
                      <i className="fa-solid fa-plus text-xs" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
