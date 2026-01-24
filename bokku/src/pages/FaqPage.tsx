import PageLayout from "./PageLayout";

const FaqPage = () => {
  return (
    <PageLayout
      title="FAQ"
      description="Answers to the most common questions about shopping with Bokku."
    >
      <div className="faq-list">
        <div className="faq-item">
          <h3>How fast is delivery?</h3>
          <p>Most orders arrive within 60-90 minutes depending on your area.</p>
        </div>
        <div className="faq-item">
          <h3>Can I schedule a delivery?</h3>
          <p>Yes. Choose a delivery window at checkout and we will handle the rest.</p>
        </div>
        <div className="faq-item">
          <h3>How do I contact support?</h3>
          <p>Reach us by email or chat and we will reply within one business day.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default FaqPage;
