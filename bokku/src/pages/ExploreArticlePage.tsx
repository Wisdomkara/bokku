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

  return (
    <PageLayout title={article.title} description={article.description}>
      <article className="explore-article">
        <div className="explore-article__image">
          <img src={article.image} alt={article.title} />
        </div>
        <div className="explore-article__content">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="explore-article__back" to="/">
          Back to home
        </Link>
      </article>
    </PageLayout>
  );
};

export default ExploreArticlePage;
