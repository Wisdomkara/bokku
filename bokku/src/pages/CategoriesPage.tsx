import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "./PageLayout";
import { products } from "../data/products";
import useGsapReveal from "../hooks/useGsapReveal";

type CategorySlide = {
  id: string;
  title: string;
  image: string;
  link: string;
};

const categorySlides: CategorySlide[] = [
  {
    id: "bakery",
    title: "Bakery and fresh food",
    image: "/images/categories/bakery-fresh.jpg",
    link: "/products?category=Bakery%20and%20fresh%20food",
  },
  {
    id: "pantry",
    title: "Groceries and pantry staple",
    image: "/images/categories/pantry.jpg",
    link: "/products?category=Groceries%20and%20pantry%20staple",
  },
  {
    id: "household",
    title: "Household and cleaning supplies",
    image: "/images/categories/household.jpg",
    link: "/products?category=Household%20and%20cleaning%20supplies",
  },
  {
    id: "beverages",
    title: "Beverages",
    image: "/images/categories/beverages.jpg",
    link: "/products?category=Beverages",
  },
  {
    id: "snacks",
    title: "Snacks",
    image: "/images/categories/snacks.jpg",
    link: "/products?category=Snacks",
  },
  {
    id: "health",
    title: "Health and beauty",
    image: "/images/categories/health-beauty.jpg",
    link: "/products?category=Health%20and%20beauty",
  },
];

const CategoriesPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const categories = useMemo(
    () =>
      products.reduce<string[]>((acc, product) => {
        if (!acc.includes(product.category)) acc.push(product.category);
        return acc;
      }, []),
    []
  );

  useGsapReveal(sectionRef);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % categorySlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <PageLayout
      title="Categories"
      description="Explore every product line and jump straight into what you need."
    >
      <section className="category-page" ref={sectionRef}>
        <div className="category-page__slider reveal">
          <div className="category-slider-frame reveal">
            {categorySlides.map((slide, index) => (
              <Link
                key={slide.id}
                to={slide.link}
                className={`category-slider-slide${
                  index === activeSlide ? " active" : ""
                }`}
                aria-hidden={index !== activeSlide}
                tabIndex={index === activeSlide ? 0 : -1}
              >
                <img src={slide.image} alt={slide.title} />
                <div className="category-slider-tag">{slide.title}</div>
              </Link>
            ))}
          </div>
          <div className="category-slider-controls reveal">
            {categorySlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${slide.title}`}
              />
            ))}
          </div>
        </div>

        <div className="category-page__grid reveal">
          {categories.map((category) => (
            <Link
              key={category}
              className="category-page__card reveal"
              to={`/products?category=${encodeURIComponent(category)}`}
            >
              <span>{category}</span>
              <span className="category-page__cta">View products</span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default CategoriesPage;
