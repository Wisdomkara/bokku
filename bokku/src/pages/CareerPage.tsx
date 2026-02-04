import { useState } from "react";
import PageLayout from "./PageLayout";
import { submitJobApplication } from "../lib/jobApplications";

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
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<JobOpening | null>(null);
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyResumeUrl, setApplyResumeUrl] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [isApplySubmitting, setIsApplySubmitting] = useState(false);

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
                  onClick={() => {
                    setSelectedRole(job);
                    setIsApplyOpen(true);
                    setApplyError(null);
                    setApplySuccess(null);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl animate-scale-in">
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              onClick={() => setIsApplyOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              Application
            </span>
            <h3 className="mb-2 text-2xl font-bold text-blue-950 font-display">
              Apply for {selectedRole?.title ?? "this role"}
            </h3>
            <p className="mb-6 text-slate-600">
              Share your details and we will reach out with next steps.
            </p>

            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={async (event) => {
                event.preventDefault();
                setApplyError(null);
                setApplySuccess(null);
                setIsApplySubmitting(true);
                try {
                  await submitJobApplication({
                    fullName: applyName,
                    email: applyEmail,
                    phone: applyPhone,
                    resumeUrl: applyResumeUrl,
                    message: applyMessage,
                    roleId: selectedRole?.id,
                    roleTitle: selectedRole?.title,
                  });
                  setApplyName("");
                  setApplyEmail("");
                  setApplyPhone("");
                  setApplyResumeUrl("");
                  setApplyMessage("");
                  setApplySuccess("Application received. We will contact you within 3-5 business days.");
                  window.setTimeout(() => {
                    setIsApplyOpen(false);
                  }, 2000);
                } catch (error) {
                  setApplyError(
                    error instanceof Error
                      ? error.message
                      : "Unable to submit application."
                  );
                } finally {
                  setIsApplySubmitting(false);
                }
              }}
            >
              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-semibold text-slate-900">Full name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={applyName}
                  onChange={(event) => setApplyName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-semibold text-slate-900">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={applyEmail}
                  onChange={(event) => setApplyEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-semibold text-slate-900">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 812 000 0000"
                  value={applyPhone}
                  onChange={(event) => setApplyPhone(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-sm font-semibold text-slate-900">Resume link</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={applyResumeUrl}
                  onChange={(event) => setApplyResumeUrl(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-semibold text-slate-900">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you're a great fit."
                  value={applyMessage}
                  onChange={(event) => setApplyMessage(event.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              {applyError && (
                <div className="md:col-span-2">
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                    {applyError}
                  </p>
                </div>
              )}
              {applySuccess && (
                <div className="md:col-span-2">
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    {applySuccess}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isApplySubmitting}
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isApplySubmitting ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CareerPage;
