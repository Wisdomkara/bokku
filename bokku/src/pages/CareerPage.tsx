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
      title="Careers at Bokku"
      description="Join Bokku and help shape the future of everyday retail in Africa."
    >
      <div className="relative mb-20 overflow-hidden rounded-3xl bg-blue-950 px-6 py-16 text-center text-white shadow-2xl sm:px-12 lg:px-24">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="mb-6 inline-block rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
            We are hiring
          </span>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl font-display">
            Build meaningful work with a high-growth retail team.
          </h2>
          <p className="text-lg text-slate-300 md:text-xl leading-relaxed">
            From merchandising and fulfillment to product and logistics, Bokku is
            building a best-in-class commerce experience for customers across the
            country.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <h3 className="text-2xl font-bold text-slate-900">Open positions</h3>
          <p className="text-slate-500">
            {jobOpenings.length} roles available
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {jobOpenings.map((job) => (
            <article
              key={job.id}
              className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg md:flex-row md:items-start md:justify-between"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-primary">{job.department}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {job.title}
                </h4>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  {job.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition group-hover:bg-slate-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-start gap-3 md:items-end">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <i className="fa-solid fa-location-dot" /> {job.location}
                </div>
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CareerPage;
