import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { products } from "../../data/products";

type Slide = {
  id: string;
  image: string;
  alt: string;
  link: string;
  label: string;
};

const slides: Slide[] = [
  {
    id: "fresh-arrivals",
    image: "/images/slider/fresh-arrivals.jpg",
    alt: "Fresh arrivals on display",
    link: "/products",
    label: "Fresh Arrivals",
  },
  {
    id: "bakeries",
    image: "/images/slider/bakery-line.jpg",
    alt: "Bakery favorites",
    link: "/products/artisan-sourdough",
    label: "Bakery Favorites",
  },
  {
    id: "pantry-staples",
    image: "/images/slider/pantry-staples.jpg",
    alt: "Pantry staples",
    link: "/products/pantry-rice-bag",
    label: "Pantry Staples",
  },
  {
    id: "clean-home",
    image: "/images/slider/clean-home.jpg",
    alt: "Cleaning essentials",
    link: "/products/surface-sparkle-cleaner",
    label: "Clean Home Picks",
  },
  {
    id: "snack-time",
    image: "/images/slider/snack-time.jpg",
    alt: "Snack time favorites",
    link: "/products/sea-salt-crackers",
    label: "Snack Time",
  },
];

const categories = [
  "Bakery and fresh food",
  "Groceries and pantry staple",
  "Household and cleaning supplies",
  "Beverages",
  "Snacks",
  "Health and beauty",
];

const HomeHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0]);

  const productsByCategory = useMemo(() => {
    return categories.map((category) => ({
      category,
      items: products.filter((product) => product.category === category),
    }));
  }, []);

  const nextSlide = () =>
    setActiveSlide((current) => (current + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="home-hero">
      <div className="home-hero__categories reveal-left">
        <div className="eyebrow">Shop by category</div>
        <h2>Everything you need, curated daily.</h2>
        <p>
          Jump into a category or go straight to a product detail to see prices,
          descriptions, and delivery options.
        </p>
        <div className="category-panel">
          {productsByCategory.map(({ category, items }) => {
            const isOpen = openCategory === category;
            return (
              <div className="category-item" key={category}>
                <button
                  className="category-trigger"
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? null : category)}
                  aria-expanded={isOpen}
                >
                  <span>{category}</span>
                  <span className={`category-icon${isOpen ? " open" : ""}`}>v</span>
                </button>
                {isOpen && (
                  <div className="category-links">
                    {items.map((item) => (
                      <Link key={item.slug} to={`/products/${item.slug}`}>
                        {item.name}
                      </Link>
                    ))}
                    <Link className="category-cta" to="/products">
                      View all
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="home-hero__slider reveal">
        <div className="slider-frame reveal">
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              to={slide.link}
              className={`slider-slide${index === activeSlide ? " active" : ""}`}
              aria-hidden={index !== activeSlide}
              tabIndex={index === activeSlide ? 0 : -1}
            >
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-tag">{slide.label}</div>
            </Link>
          ))}
        </div>
        <div className="slider-controls reveal">
          <button type="button" onClick={prevSlide} aria-label="Previous slide">
            Prev
          </button>
          <div className="slider-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to ${slide.label}`}
              />
            ))}
          </div>
          <button type="button" onClick={nextSlide} aria-label="Next slide">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
