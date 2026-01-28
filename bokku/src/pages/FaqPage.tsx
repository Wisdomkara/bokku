import PageLayout from "./PageLayout";

const FaqPage = () => {
  return (
    <PageLayout
      title="FAQ"
      description="Answers to the most common questions about shopping with Bokku."
    >
      <section className="faq-page">
        <div className="faq-hero">
          <div className="faq-hero__content">
            <span className="faq-hero__eyebrow">Support center</span>
            <h2>Get quick answers before you shop.</h2>
            <p>
              Find delivery, payment, returns, and account guidance in one place.
              If you still need help, our support team is ready to assist.
            </p>
          </div>
          <div className="faq-hero__card">
            <h3>Need help now?</h3>
            <p>Support is available Monday - Sunday, 8:00 AM - 10:00 PM.</p>
            <button type="button">Contact support</button>
          </div>
        </div>

        <div className="faq-grid">
          <details className="faq-item">
            <summary>How do I become a bokku! supplier?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Write us an email at purchasing@atreos.com and you will receive
                  our New Supplier Application Form.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>What is a basic range item?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  A basic range item is an item that we sell every day in our
                  stores.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>What is a Private Label?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Private Label refers to our own brand name on our products.
                  bokku! private label product quality meets or exceeds comparable
                  brands.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>What is a Display Ready Case (DRC)?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  A Display Ready Case refers to the outer case that should be
                  ready to merchandise within our bokku! stores with no repacking
                  necessary.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>
              Who is responsible for the label/case artwork fee? Can we use our
              own design agency?
            </summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Suppliers work closely with our central purchasing team
                  overseeing private labels.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>Can I schedule a meeting with Purchasing?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Once your email has been reviewed, the Purchasing team will
                  contact you to discuss next steps.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>Can I send samples?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Please do not submit samples unless requested by the Purchasing
                  team.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>Is it important for a supplier to visit a bokku! store?</summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Yes, a store visit is very important so that you can view our
                  assortment, display cases and artwork.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>
              Will I need to have my products tested by a 3rd-party testing
              facility?
            </summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Yes, if you are chosen to become a bokku! supplier, we will
                  request you to send your products to a recommended
                  NAFDAC-recognized 3rd-party testing facility. bokku! also does
                  internal product testing for all products.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>
              What documents will I be asked to submit if chosen to become a
              supplier?
            </summary>
            <div className="faq-item__content">
              <div>
                <p>
                  All private label food production facilities must have a
                  License To Operate (LTO) from NAFDAC. The Purchasing team will
                  request for a copy of your Certificate of Registration (CAC);
                  Business Permit; SEC or any equivalent documentation such but
                  not limited to Business Registration; Sales Invoice; Collection
                  Receipt, third party audit certificate for all food
                  manufacturing facilities.
                </p>
              </div>
            </div>
          </details>
          <details className="faq-item">
            <summary>
              Can I submit a deck outlining company and product information along
              with the Supplemental Submission Form?
            </summary>
            <div className="faq-item__content">
              <div>
                <p>
                  Yes, it is encouraged that a new supplier submits visuals to
                  showcase your company and product portfolio.
                </p>
              </div>
            </div>
          </details>
        </div>

        <div className="faq-cta">
          <div>
            <h3>Still have questions?</h3>
            <p>
              Visit a Bokku store for in-person assistance or send us a note and
              we will respond quickly.
            </p>
          </div>
          <button type="button">Visit a store</button>
        </div>

        <div className="faq-cta">
          <div>
            <h3>Get in Touch</h3>
            <p>
              Email our purchasing team at purchasing@atreos.com and we will guide
              you through the supplier onboarding steps.
            </p>
          </div>
          <a className="faq-cta__link" href="mailto:purchasing@atreos.com">
            Email purchasing@atreos.com
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default FaqPage;
