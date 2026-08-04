import { useState } from "react";
import { Link } from "react-router-dom";
import { exploreArticles } from "../../data/exploreArticles";

const ExploreBokku = () => {
  const [activeSlug, setActiveSlug] = useState(exploreArticles[0]?.slug ?? "");
  const activeArticle =
    exploreArticles.find((article) => article.slug === activeSlug) ??
    exploreArticles[0];

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-24 text-slate-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase text-slate-700 shadow-sm">
              <i className="fa-solid fa-compass" aria-hidden="true" />
              Explore intelligence
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Stories and guides with a polished command-center finish.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Move through Bokku collections with richer image surfaces,
              directional glass highlights, and focused article previews.
            </p>
          </div>
          {activeArticle && (
            <div className="edge-glass edge-glass-y rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-xs font-bold uppercase text-blue-700">
                Reading path
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-950">
                {activeArticle.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                {activeArticle.description}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {exploreArticles.slice(0, 6).map((article) => (
            <article
              key={article.slug}
              onMouseEnter={() => setActiveSlug(article.slug)}
              onFocus={() => setActiveSlug(article.slug)}
              className="edge-glass group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300/70 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            >
              <Link
                to={`/explore/${article.slug}`}
                className="flex flex-1 flex-col focus:outline-none focus:ring-4 focus:ring-yellow-300/25"
              >
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.58))]" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-xs font-bold text-blue-700 backdrop-blur-xl">
                    Guide
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold text-slate-950 transition-colors group-hover:text-blue-700">
                    {article.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {article.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700 transition-all group-hover:gap-3">
                    Read Article
                    <i
                      className="fa-solid fa-arrow-right-long"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreBokku;
