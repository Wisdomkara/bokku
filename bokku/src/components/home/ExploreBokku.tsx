import { Link } from "react-router-dom";
import { exploreArticles } from "../../data/exploreArticles";

const ExploreBokku = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950 md:text-4xl font-display">
            Explore Bokku
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the stories, tips, and guides behind our favorite collections.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {exploreArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
              </div>
              
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-2xl font-bold font-display text-blue-950 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-slate-600">
                  {article.description}
                </p>
                <Link
                  to={`/explore/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all group-hover:gap-3"
                >
                  Read Article <i className="fa-solid fa-arrow-right-long" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreBokku;
