import PageLayout from "./PageLayout";

const SupplierPage = () => {
  return (
    <PageLayout
      title="Supplier"
      description="This is the Supplier page for vendors who want to work with Bokku."
      className="page--hero"
    >
      <section className="supplier-page">
        <div className="supplier-hero">
          <div className="supplier-hero__inner">
            <div className="supplier-hero__content">
              <span className="supplier-hero__eyebrow">Work with Bokku</span>
              <h2>Dear Suppliers and Manufacturers</h2>
              <p>
                Interested in growing with bokku!? Since 2022, bokku! has
                offered an intentionally different shopping experience where
                customers never have to compromise on quality or value. bokku!
                is the fastest-growing retailer in Nigeria, operating over 110
                stores at the end of 2024 and serving thousands of customers
                each month.
              </p>
              <p>
                As we continue to expand across the country, we are constantly
                looking for new suppliers that can help us improve our
                assortment, offer high quality products and serve the high
                demand of our customers. We always aim for long-term
                relationships that grow alongside our business.
              </p>
              <div className="supplier-hero__stats">
                <div>
                  <strong>110+</strong>
                  <span>Stores nationwide</span>
                </div>
                <div>
                  <strong>2022</strong>
                  <span>Supplier program launch</span>
                </div>
                <div>
                  <strong>Fast</strong>
                  <span>Volume-driven growth</span>
                </div>
              </div>
            </div>
            <aside className="supplier-hero__card">
              <h3>Become a bokku! Supplier</h3>
              <p>
                Please take the first step toward a profitable, long-term
                partnership with bokku!. Begin by visiting a bokku! store and
                reviewing our Frequently Asked Questions, see below.
              </p>
              <div className="supplier-hero__card-actions">
                <span>Contact us at purchasing@atreos.com</span>
                <button type="button">Start a supplier conversation</button>
              </div>
            </aside>
          </div>
        </div>

        <div className="page-body">
          <div className="supplier-grid">
            <section className="supplier-benefits">
              <h3>When you partner with bokku! you can expect:</h3>
              <ul>
                <li>Fast growth based on sales volume and expansion.</li>
                <li>Efficient deliveries to a central warehouse.</li>
                <li>Close cooperation and business planning.</li>
                <li>We always pay on time.</li>
              </ul>
            </section>

            <section className="supplier-gallery">
              <div className="supplier-gallery__card">
                <div className="supplier-gallery__label">bokku! store</div>
              </div>
              <div className="supplier-gallery__card">
                <div className="supplier-gallery__label">bokku! store</div>
              </div>
            </section>
          </div>

          <section className="supplier-expectations">
            <div>
              <h3>Our Expectations</h3>
              <p>
                We do not require suppliers to pay or manage any extras, such as:
              </p>
            </div>
            <ul>
              <li>Unwarranted deductions.</li>
              <li>Coupons or promotions.</li>
              <li>Marketing, food shows or listing fees.</li>
              <li>In-store displays or rack-jobbing.</li>
            </ul>
            <p className="supplier-expectations__contact">
              Contact us at purchasing@atreos.com
            </p>
          </section>

          <section className="supplier-cta">
            <div>
              <h3>Become a bokku! Supplier</h3>
              <p>
                Ready to grow with a partner that values quality, scale, and
                long-term collaboration? Visit a bokku! store and review our
                FAQs to get started.
              </p>
            </div>
            <button type="button">Visit a bokku! store</button>
          </section>
        </div>
      </section>
    </PageLayout>
  );
};

export default SupplierPage;
