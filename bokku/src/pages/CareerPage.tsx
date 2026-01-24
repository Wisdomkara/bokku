import PageLayout from "./PageLayout";

type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  tags: string[];
};

const jobOpenings: JobOpening[] = [
  {
    id: "operations-manager",
    title: "Operations Manager",
    department: "Retail Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    summary:
      "Lead store performance, staffing, and inventory execution across key Bokku branches.",
    tags: ["Leadership", "Retail", "Inventory"],
  },
  {
    id: "supply-chain-analyst",
    title: "Supply Chain Analyst",
    department: "Supply Chain",
    location: "Abuja, Nigeria",
    type: "Full-time",
    summary:
      "Monitor inbound delivery cycles and optimize procurement for high-velocity categories.",
    tags: ["Analytics", "Procurement", "Forecasting"],
  },
  {
    id: "ecommerce-specialist",
    title: "E-commerce Specialist",
    department: "Digital Commerce",
    location: "Remote - Nigeria",
    type: "Full-time",
    summary:
      "Own product merchandising, promos, and catalog accuracy across Bokku.com.",
    tags: ["Merchandising", "Catalog", "Digital"],
  },
  {
    id: "customer-care",
    title: "Customer Care Associate",
    department: "Customer Experience",
    location: "Lagos, Nigeria",
    type: "Shift-based",
    summary:
      "Deliver fast, friendly support across chat, phone, and email channels.",
    tags: ["Support", "Communication", "Service"],
  },
  {
    id: "warehouse-lead",
    title: "Warehouse Team Lead",
    department: "Fulfillment",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
    summary:
      "Coordinate picking, packing, and dispatch for same-day customer orders.",
    tags: ["Fulfillment", "Logistics", "Operations"],
  },
];

const CareerPage = () => {
  return (
    <PageLayout
      title="Career"
      description="Join Bokku and help shape the future of everyday retail in Africa."
    >
      <section className="career-page">
        <div className="career-hero">
          <div className="career-hero__content">
            <span className="career-hero__pill">Careers at Bokku</span>
            <h2>Build meaningful work with a high-growth retail team.</h2>
            <p>
              From merchandising and fulfillment to product and logistics, Bokku is
              building a best-in-class commerce experience for customers across the
              country.
            </p>
          </div>
          <div className="career-hero__image" role="presentation" />
        </div>

        <div className="career-jobs">
          <div className="career-jobs__header">
            <h3>Open positions</h3>
            <p>Explore the latest Bokku vacancies and apply today.</p>
          </div>
          <div className="career-jobs__grid">
            {jobOpenings.map((job) => (
              <article key={job.id} className="career-job-card">
                <div className="career-job-card__meta">
                  <span>{job.department}</span>
                  <span>{job.type}</span>
                </div>
                <h4>{job.title}</h4>
                <p>{job.summary}</p>
                <div className="career-job-card__tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="career-job-card__footer">
                  <span>{job.location}</span>
                  <button type="button">Apply now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CareerPage;
