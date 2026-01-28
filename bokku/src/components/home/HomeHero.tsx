import { useEffect, useMemo, useState } from "react";
import { categoryImageList } from "../../data/categoryImages";

type Slide = {
  id: string;
  image: string;
  alt: string;
  link: string;
  label: string;
};

const slides: Slide[] = [
  {
    id: "Hand-Crafted Beads",
    image: "/assets/sliderimage/necklace.jpg",
    alt: "Fresh arrivals on display",
    link: "/products",
    label: "Fresh Arrivals",
  },
  {
    id: "bakeries",
    image: "/assets/sliderimage/bokku.jpg",
    alt: "Bakery favorites",
    link: "/products/artisan-sourdough",
    label: "Bakery Favorites",
  },
  {
    id: "pantry-staples",
    image: "/assets/sliderimage/bokkuoil2.jpg",
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

// Mock products data
const products = [
  {
    name: "Artisan Sourdough",
    slug: "artisan-sourdough",
    category: "Bakery and fresh food",
  },
  {
    name: "Whole Grain Bread",
    slug: "whole-grain-bread",
    category: "Bakery and fresh food",
  },
  {
    name: "Rice Bag 5kg",
    slug: "pantry-rice-bag",
    category: "Groceries and pantry staple",
  },
  {
    name: "Olive Oil",
    slug: "olive-oil",
    category: "Groceries and pantry staple",
  },
  {
    name: "Surface Cleaner",
    slug: "surface-sparkle-cleaner",
    category: "Household and cleaning supplies",
  },
  {
    name: "Laundry Detergent",
    slug: "laundry-detergent",
    category: "Household and cleaning supplies",
  },
  { name: "Orange Juice", slug: "orange-juice", category: "Beverages" },
  { name: "Coffee Beans", slug: "coffee-beans", category: "Beverages" },
  { name: "Sea Salt Crackers", slug: "sea-salt-crackers", category: "Snacks" },
  { name: "Mixed Nuts", slug: "mixed-nuts", category: "Snacks" },
  { name: "Hand Soap", slug: "hand-soap", category: "Health and beauty" },
  { name: "Shampoo", slug: "shampoo", category: "Health and beauty" },
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
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const heroImages = useMemo(() => [...categoryImageList], []);

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
    <section className="relative left-1/2 right-1/2 h-[80vh] w-screen -translate-x-1/2 overflow-hidden px-6 pb-6 pt-0 md:px-12 lg:px-16 mt-9">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-white/60 blur-3xl animate-[hero-blob_38s_ease-in-out_infinite]" />
        <div className="absolute bottom-32 right-16 h-80 w-80 rounded-full bg-white/50 blur-3xl animate-[hero-blob_46s_ease-in-out_infinite] [animation-delay:-12s]" />
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-200/50 blur-[80px] animate-[hero-drift-x_18s_ease-in-out_infinite]" />
      </div>

      <div className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.4fr)] lg:items-stretch lg:gap-12">
        <div className="reveal-left flex h-full min-h-0 flex-col gap-5">
          {/* <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-blue-700">
            Shop by category
          </div> */}
          <h2 className="text-2xl font-semibold leading-tight text-blue-800 md:text-3xl">
            Nigeria's FIRST hard discount store
          </h2>
          {/* <p className="max-w-xl text-sm leading-6 text-blue-700/90 md:text-base">
            Jump into a category or go straight to a product detail to see
            prices, descriptions, and delivery options.
          </p> */}

          <div className="flex flex-1 min-h-0 flex-col gap-2 overflow-auto rounded-2xl border border-slate-900/5 bg-white/90 p-4 shadow-[0_18px_40px_rgba(11,31,74,0.12)] backdrop-blur">
            {productsByCategory.map(({ category, items }) => {
              const isOpen = openCategory === category;
              return (
                <div key={category} className="rounded-xl">
                  <button
                    className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    type="button"
                    onClick={() => setOpenCategory(isOpen ? null : category)}
                    aria-expanded={isOpen}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-base text-blue-600 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      v
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2 flex flex-col gap-1 pb-2">
                      {items.map((item) => (
                        <a
                          key={item.slug}
                          href={`/products/${item.slug}`}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                        >
                          {item.name}
                        </a>
                      ))}
                      <a
                        className="mt-1 inline-flex w-fit items-center rounded-full bg-yellow-300 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
                        href="/products"
                      >
                        View all
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal flex h-full min-h-0 w-full flex-col gap-4">
          <div
            className="
  reveal
  relative
  flex-1
  w-full
  min-h-55
  max-h-[50vh]
  overflow-hidden
  rounded-2xl
  bg-slate-950
  shadow-[0_16px_40px_rgba(255,214,0,0.18)]
  sm:min-h-70
  sm:max-h-[65vh]
  sm:rounded-3xl
  sm:shadow-[0_24px_60px_rgba(255,214,0,0.2)]
  lg:max-h-screen
  lg:shadow-[0_30px_80px_rgba(255,214,0,0.22)]
"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <a
                  key={slide.id}
                  href={slide.link}
                  className={`absolute inset-0 flex transition-all duration-300 ease-out ${
                    isActive
                      ? "z-10 translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                >
                  <img
                    src={heroImages[index % heroImages.length] ?? slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-300/15 via-yellow-200/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md">
                    {slide.label}
                  </div>
                </a>
              );
            })}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

          <div className="reveal flex items-center justify-center gap-2 shrink-0">
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to ${slide.label}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    isActive
                      ? "scale-110 bg-yellow-300"
                      : "bg-yellow-300/40 hover:bg-yellow-200"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
