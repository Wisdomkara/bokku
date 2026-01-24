import { Link } from "react-router-dom";
import { exploreArticles } from "../../data/exploreArticles";

const ExploreBokku = () => {
  return (
    <section className="explore-bokku">
      <div className="explore-bokku__header reveal">
        <h2>Explore BOKKU</h2>
        <p>Discover the stories, tips, and guides behind our favorite categories.</p>
      </div>
      <div className="explore-bokku__grid">
        {exploreArticles.map((article) => (
          <article key={article.slug} className="explore-bokku__card reveal">
            <div className="explore-bokku__image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="explore-bokku__body">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link className="explore-bokku__cta" to={`/explore/${article.slug}`}>
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExploreBokku;
