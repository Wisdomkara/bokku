import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGsapReveal from "../../hooks/useGsapReveal";
import { categoryImageList } from "../../data/categoryImages";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  id: string;
  image: string;
  alt: string;
  link: string;
  label: string;
  sublabel?: string;
};

const slides: Slide[] = [
  {
    id: "Hand-Crafted Beads",
    image: "/assets/sliderimage/necklace.jpg",
    alt: "Fresh arrivals on display",
    link: "/products",
    label: "Fresh Arrivals",
    sublabel: "Discover the latest trends",
  },
  {
    id: "bakeries",
    image: "/assets/sliderimage/bokku.jpg",
    alt: "Bakery favorites",
    link: "/products/artisan-sourdough",
    label: "Bakery Favorites",
    sublabel: "Fresh from the oven",
  },
  {
    id: "pantry-staples",
    image: "/assets/sliderimage/bokkuoil2.jpg",
    alt: "Pantry staples",
    link: "/products/pantry-rice-bag",
    label: "Pantry Staples",
    sublabel: "Essentials for every meal",
  },
  {
    id: "clean-home",
    image: "/images/slider/clean-home.jpg",
    alt: "Cleaning essentials",
    link: "/products/surface-sparkle-cleaner",
    label: "Clean Home Picks",
    sublabel: "Sparkle & shine",
  },
  {
    id: "snack-time",
    image: "/images/slider/snack-time.jpg",
    alt: "Snack time favorites",
    link: "/products/sea-salt-crackers",
    label: "Snack Time",
    sublabel: "Crunchy goodness",
  },
];



const HomeHero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = useMemo(() => [...categoryImageList], []);

  const nextSlide = () =>
    setActiveSlide((current) => (current + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);

  useGsapReveal(heroRef, {
    selector: ".hero-reveal",
    stagger: 0.12,
    y: 48,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroRef.current!.querySelectorAll<HTMLImageElement>("img.hero-parallax"), {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen max-w-none overflow-hidden px-4 py-4 md:px-8 lg:px-12"
    >
      <div className="relative h-[65vh] min-h-125 w-full overflow-hidden rounded-4xl shadow-2xl">
        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <img
                src={heroImages[index % heroImages.length] ?? slide.image}
                alt={slide.alt}
                className="hero-parallax h-full w-full object-cover transition-transform duration-8000 ease-out scale-105 hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />

              {/* Text Content */}
              <div
                className={`hero-reveal absolute bottom-0 left-0 w-full p-8 md:p-16 lg:w-2/3 transition-all duration-700 delay-300 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
              >
                <span className="inline-block rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black mb-4">
                  {slide.label}
                </span>
                <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl mb-4 font-display">
                  {slide.sublabel || slide.label}
                </h2>
                <a
                  href={slide.link}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-blue-950 transition hover:bg-yellow-300 hover:-translate-y-1"
                >
                  Browse Products <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </div>
          );
        })}

        {/* Navigation Controlls */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 border border-white/20"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 border border-white/20"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
