import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

const AboutPage = () => {
  return (
    <PageLayout
      title="About Us"
      description="Bokku is a modern retail marketplace connecting households to fresh food, daily essentials, and trusted brands."
      className="page--hero"
    >
      <section className="about-page">
        <div className="about-hero">
          <div className="about-hero__content">
            <span className="about-hero__eyebrow">About Bokku</span>
            <h2>Modern retail built around real life.</h2>
            <p>
              Bokku is a modern retail marketplace connecting households to fresh
              food, daily essentials, and trusted brands. We blend neighborhood
              convenience with technology to make everyday shopping simpler,
              faster, and more reliable.
            </p>
            <div className="about-hero__stats">
              <div>
                <strong>110+</strong>
                <span>Stores across Nigeria</span>
              </div>
              <div>
                <strong>Same-day</strong>
                <span>Fulfillment focus</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Supply chain planning</span>
              </div>
            </div>
          </div>
          <div className="about-hero__image">
            <img src="/categoryimages/groceries.jpg" alt="Bokku essentials" />
          </div>
        </div>

        <div className="page-body">
          <div className="about-values">
            <h3>What we stand for</h3>
            <div className="about-values__grid">
              <article>
                <h4>Freshness first</h4>
                <p>
                  We work directly with suppliers to keep produce, bakery, and deli
                  items at their best.
                </p>
              </article>
              <article>
                <h4>Reliable delivery</h4>
                <p>
                  Our fulfillment teams ensure each order arrives on time and in
                  the right condition.
                </p>
              </article>
              <article>
                <h4>Trusted pricing</h4>
                <p>
                  Transparent pricing and weekly discounts help customers shop with
                  confidence.
                </p>
              </article>
            </div>
          </div>

          <div className="about-story">
            <h3>How we operate</h3>
            <div className="about-story__grid">
              <article>
                <h4>Demand-led assortment</h4>
                <p>
                  We use customer insights to keep the most requested products in
                  stock.
                </p>
              </article>
              <article>
                <h4>Cold-chain excellence</h4>
                <p>
                  Dedicated handling protects freshness from warehouse to store.
                </p>
              </article>
              <article>
                <h4>Human-first service</h4>
                <p>
                  Our store teams are trained to deliver a warm, welcoming
                  experience.
                </p>
              </article>
            </div>
          </div>

          <div className="about-timeline">
            <h3>Our journey</h3>
            <div className="about-timeline__grid">
              <div>
                <span>2017</span>
                <p>Launched Bokku with a mission to modernize grocery retail.</p>
              </div>
              <div>
                <span>2020</span>
                <p>Expanded same-day delivery and opened flagship warehouses.</p>
              </div>
              <div>
                <span>2023</span>
                <p>Scaled nationwide coverage with specialized cold-chain logistics.</p>
              </div>
              <div>
                <span>2025</span>
                <p>Introduced smart savings, loyalty rewards, and pickup services.</p>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <div>
              <h3>Shop smarter with Bokku</h3>
              <p>
                Whether you are stocking up for the week or planning a celebration,
                Bokku keeps you covered with curated categories and fast delivery.
              </p>
            </div>
            <Link to="/#categories" className="about-cta__link">
              Start shopping
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
