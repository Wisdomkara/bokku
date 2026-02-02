import PageLayout from "./PageLayout";

const FaqPage = () => {
  return (
    <PageLayout
      title="FAQ"
      description="Answers to the most common questions about shopping with Bokku."
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 rounded-3xl bg-blue-950 p-8 text-center text-white md:p-12">
          <span className="mb-4 inline-block font-bold uppercase tracking-wider text-accent/80">Support Center</span>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl font-display">Get quick answers before you shop.</h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-300">
            Find delivery, payment, returns, and account guidance in one place.
            If you still need help, our support team is ready to assist.
          </p>
          <div className="mx-auto flex w-fit flex-col items-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:flex-row sm:gap-6">
            <div className="text-left">
              <h3 className="font-bold text-white">Need help now?</h3>
              <p className="text-sm text-slate-300">Mon - Sun, 8:00 AM - 10:00 PM</p>
            </div>
            <button
              type="button"
              className="mt-4 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 sm:mt-0"
            >
              Contact Support
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How do I become a bokku! supplier?",
              a: "Write us an email at purchasing@atreos.com and you will receive our New Supplier Application Form."
            },
            {
              q: "What is a basic range item?",
              a: "A basic range item is an item that we sell every day in our stores."
            },
            {
              q: "What is a Private Label?",
              a: "Private Label refers to our own brand name on our products. bokku! private label product quality meets or exceeds comparable brands."
            },
            {
              q: "What is a Display Ready Case (DRC)?",
              a: "A Display Ready Case refers to the outer case that should be ready to merchandise within our bokku! stores with no repacking necessary."
            },
            {
              q: "Who is responsible for the label/case artwork fee? Can we use our own design agency?",
              a: "Suppliers work closely with our central purchasing team overseeing private labels."
            },
            {
              q: "Can I schedule a meeting with Purchasing?",
              a: "Once your email has been reviewed, the Purchasing team will contact you to discuss next steps."
            },
            {
              q: "Can I send samples?",
              a: "Please do not submit samples unless requested by the Purchasing team."
            },
            {
              q: "Is it important for a supplier to visit a bokku! store?",
              a: "Yes, a store visit is very important so that you can view our assortment, display cases and artwork."
            },
            {
              q: "Will I need to have my products tested by a 3rd-party testing facility?",
              a: "Yes, if you are chosen to become a bokku! supplier, we will request you to send your products to a recommended NAFDAC-recognized 3rd-party testing facility. bokku! also does internal product testing for all products."
            },
            {
              q: "What documents will I be asked to submit if chosen to become a supplier?",
              a: "All private label food production facilities must have a License To Operate (LTO) from NAFDAC. The Purchasing team will request for a copy of your Certificate of Registration (CAC); Business Permit; SEC or any equivalent documentation such but not limited to Business Registration; Sales Invoice; Collection Receipt, third party audit certificate for all food manufacturing facilities."
            },
            {
              q: "Can I submit a deck outlining company and product information along with the Supplemental Submission Form?",
              a: "Yes, it is encouraged that a new supplier establishes visuals to showcase company and product portfolio."
            }
          ].map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-200 bg-slate-50 open:bg-white open:shadow-lg transition-all transform duration-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-slate-900 focus:outline-none">
                {item.q}
                <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition group-open:-rotate-180">
                  <i className="fa-solid fa-chevron-down text-xs" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-100 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
              <i className="fa-solid fa-location-dot" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">Still have questions?</h3>
            <p className="mb-6 text-sm text-slate-600">
              Visit a Bokku store for in-person assistance or send us a note.
            </p>
            <button className="rounded-full border-2 border-slate-900 bg-transparent px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-blue-950 hover:text-white">
              Visit a Store
            </button>
          </div>
          
          <div className="rounded-3xl bg-primary p-8 text-center text-white">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-sm">
              <i className="fa-solid fa-envelope" />
            </div>
            <h3 className="mb-2 text-lg font-bold">Get in Touch</h3>
            <p className="mb-6 text-sm text-white/80">
              Email our purchasing team and we will guide you through onboarding.
            </p>
            <a
              href="mailto:purchasing@atreos.com"
              className="inline-block rounded-full bg-white px-6 py-2 text-sm font-bold text-primary transition hover:bg-yellow-300 hover:text-slate-900"
            >
              Email Purchasing
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FaqPage;
