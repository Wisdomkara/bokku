import PageLayout from "./PageLayout";

const AboutPage = () => {
  return (
    <PageLayout
      title="About Us"
      description="Bokku is a modern retail marketplace connecting households to fresh food, daily essentials, and trusted brands."
    >
      <section className="about-page">
        <div className="about-hero">
          <div className="about-hero__content">
            <span className="about-hero__eyebrow">About Bokku</span>
            <h2>We deliver everyday essentials with speed, trust, and care.</h2>
            <p>
              Bokku is an ecommerce-led supermarket built for busy households. Our
              mission is to make grocery shopping effortless by combining curated
              inventory, reliable fulfillment, and delightful customer service.
            </p>
            <div className="about-hero__stats">
              <div>
                <strong>150K+</strong>
                <span>monthly orders</span>
              </div>
              <div>
                <strong>35+</strong>
                <span>active branches</span>
              </div>
              <div>
                <strong>4.8★</strong>
                <span>customer rating</span>
              </div>
            </div>
          </div>
          <div className="about-hero__image" role="presentation" />
        </div>

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
                Our fulfillment teams ensure each order arrives on time and in the
                right condition.
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
          <button type="button">Start shopping</button>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
