import { Link, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import { exploreArticles } from "../data/exploreArticles";

const ExploreArticlePage = () => {
  const { slug } = useParams();
  const article = exploreArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <PageLayout
        title="Explore BOKKU"
        description="We could not find that article."
      >
        <Link className="explore-article__back" to="/">
          Back to home
        </Link>
      </PageLayout>
    );
  }

  const otherArticles = exploreArticles.filter((item) => item.slug !== slug);

  return (
    <PageLayout
      title={article.title}
      description={article.description}
      className="page--hero"
    >
      <article className="explore-article">
        <div className="hero-banner">
          <div className="hero-banner__image">
            <img src={article.image} alt={article.title} />
          </div>
        </div>
        <div className="page-body">
          <div className="hero-text">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
          <div className="explore-meta">
            <Link to="/explore" className="explore-meta__back">
              Explore BOKKU
            </Link>
            <span className="explore-meta__dot" aria-hidden="true">
              •
            </span>
            <span className="explore-meta__tag">{article.title}</span>
          </div>
          <div className="explore-article__content">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <section className="explore-related">
            <div className="explore-related__header">
              <h3>Explore other categories</h3>
              <p>More stories from BOKKU.</p>
            </div>
            <div className="explore-related__grid">
              {otherArticles.map((item) => (
                <Link
                  key={item.slug}
                  className="explore-related__card"
                  to={`/explore/${item.slug}`}
                >
                  <div className="explore-related__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="explore-related__body">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <span>Read more</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <Link className="explore-article__back" to="/">
            Back to home
          </Link>
        </div>
      </article>
    </PageLayout>
  );
};

export default ExploreArticlePage;
