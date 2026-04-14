import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

const AboutPage = () => {
  return (
    <PageLayout
      title="About Us"
      description="Bokku is a modern retail marketplace connecting households to fresh food, daily essentials, and trusted brands."
    >
      <div className="flex flex-col gap-12 lg:gap-24">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 shadow-2xl lg:grid lg:min-h-[500px] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 lg:p-16">
            <span className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">About Bokku</span>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl font-display leading-tight">
              Modern retail built around real life.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Bokku is a modern retail marketplace connecting households to fresh
              food, daily essentials, and trusted brands. We blend neighborhood
              convenience with technology to make everyday shopping simpler,
              faster, and more reliable.
            </p>
            <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
              <div>
                <strong className="block text-2xl font-bold text-white">110+</strong>
                <span className="text-sm text-slate-400">Stores across Nigeria</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">Same-day</strong>
                <span className="text-sm text-slate-400">Fulfillment focus</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <img
              src="/assets/sliderimage/slider3.jpg"
              alt="Bokku essentials"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent lg:bg-gradient-to-l lg:from-slate-900/20" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold text-slate-900 font-display">What we stand for</h3>
            <p className="mt-4 text-slate-600">Our core values drive every decision we make.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Freshness first",
                desc: "We work directly with suppliers to keep produce, bakery, and deli items at their best.",
                icon: "fa-leaf"
              },
              {
                title: "Reliable delivery",
                desc: "Our fulfillment teams ensure each order arrives on time and in the right condition.",
                icon: "fa-truck"
              },
              {
                title: "Trusted pricing",
                desc: "Transparent pricing and weekly discounts help customers shop with confidence.",
                icon: "fa-tags"
              }
            ].map((value) => (
              <article key={value.title} className="rounded-2xl bg-slate-50 p-8 text-center transition hover:bg-white hover:shadow-xl hover:-translate-y-1">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl text-primary shadow-sm">
                  <i className={`fa-solid ${value.icon}`} />
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-slate-50 py-16 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="mx-auto max-w-4xl">
             <h3 className="mb-12 text-center text-3xl font-bold text-slate-900 font-display">Our journey</h3>
             <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 md:pl-0 space-y-12">
               {[
                 { year: "2017", text: "Launched Bokku with a mission to modernize grocery retail." },
                 { year: "2020", text: "Expanded same-day delivery and opened flagship warehouses." },
                 { year: "2023", text: "Scaled nationwide coverage with specialized cold-chain logistics." },
                 { year: "2025", text: "Introduced smart savings, loyalty rewards, and pickup services." },
                 { year: "2026", text: "A landmark year of global ambition — Bokku is boldly opening new stores across African markets and beyond, bringing our signature retail experience to millions of new households worldwide. The world is just getting started with Bokku! 🌍" },
               ].map((item) => (
                 <div key={item.year} className="relative pl-8 md:flex md:items-center md:gap-12 md:pl-0">
                   <div className="md:w-1/2 md:text-right md:pr-12">
                     <span className="inline-block rounded-full bg-blue-950 px-4 py-1 font-bold text-white shadow-md z-10 relative">
                       {item.year}
                     </span>
                   </div>
                   <div className="absolute left-[-5px] top-3 h-3 w-3 rounded-full bg-primary md:left-1/2 md:-ml-1.5" />
                   <div className="md:w-1/2 md:pl-12">
                     <p className="text-lg text-slate-700">{item.text}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-3xl bg-primary p-8 text-center text-white md:p-16">
          <h3 className="mb-4 text-3xl font-bold font-display">Shop smarter with Bokku</h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Whether you are stocking up for the week or planning a celebration,
            Bokku keeps you covered with curated categories and fast delivery.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-primary transition hover:bg-slate-100"
          >
            Start Shopping <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
