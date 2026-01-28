import PageLayout from "./PageLayout";

const LandlordAgenciesPage = () => {
  return (
    <PageLayout
      title="Landlord Agencies"
      description="This is the Landlord Agencies page for property partnerships."
      className="page--hero"
    >
      <section className="landlord-page">
        <div className="landlord-hero">
          <div className="landlord-hero__inner">
            <div className="landlord-hero__content">
              <span className="landlord-hero__eyebrow">Real estate partners</span>
              <h2>Grow neighborhood retail with Bokku.</h2>
              <p>
                Bokku works with landlords and agencies to secure strategic
                storefronts, expand access to daily essentials, and drive steady
                foot traffic for surrounding businesses.
              </p>
              <div className="landlord-hero__stats">
                <div>
                  <strong>110+</strong>
                  <span>Active stores</span>
                </div>
                <div>
                  <strong>Nationwide</strong>
                  <span>Expansion focus</span>
                </div>
                <div>
                  <strong>Long-term</strong>
                  <span>Lease partnerships</span>
                </div>
              </div>
            </div>
            <aside className="landlord-hero__card">
              <h3>What we bring</h3>
              <ul>
                <li>Consistent traffic from loyal customers.</li>
                <li>Store upgrades that enhance property value.</li>
                <li>On-time rent with a professional operations team.</li>
              </ul>
              <button type="button">Share an available space</button>
            </aside>
          </div>
        </div>

        <div className="page-body">
          <section className="landlord-highlights">
            <h3>Ideal locations</h3>
            <div className="landlord-highlights__grid">
              <article>
                <h4>Neighborhood anchors</h4>
                <p>
                  High-visibility corners, markets, and transit corridors with
                  strong residential demand.
                </p>
              </article>
              <article>
                <h4>Reliable utilities</h4>
                <p>
                  Spaces with steady power access and logistics-friendly
                  loading areas.
                </p>
              </article>
              <article>
                <h4>Flexible footprints</h4>
                <p>
                  Retail-ready locations that can be tailored to Bokku store
                  formats.
                </p>
              </article>
            </div>
          </section>

          <section className="landlord-steps">
            <h3>How we partner</h3>
            <div className="landlord-steps__grid">
              <div>
                <span>01</span>
                <p>Share property details and availability.</p>
              </div>
              <div>
                <span>02</span>
                <p>We review traffic, demographics, and fit.</p>
              </div>
              <div>
                <span>03</span>
                <p>Finalize lease terms and store design plan.</p>
              </div>
              <div>
                <span>04</span>
                <p>Launch with a dedicated store operations team.</p>
              </div>
            </div>
          </section>

          <section className="landlord-cta">
            <div>
              <h3>Ready to host a Bokku store?</h3>
              <p>
                Tell us about your property and we will reach out with next
                steps for partnership.
              </p>
            </div>
            <button type="button">Start a property review</button>
          </section>
        </div>
      </section>
    </PageLayout>
  );
};

export default LandlordAgenciesPage;
