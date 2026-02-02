import PageLayout from "./PageLayout";

const LandlordAgenciesPage = () => {
  return (
    <PageLayout
      title="Landlord Agencies"
      description="Partner with us to secure strategic storefronts and drive growth."
    >
      <div className="flex flex-col gap-12 lg:gap-24">
        {/* Landlord Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 shadow-2xl lg:grid lg:min-h-[500px] lg:grid-cols-2">
           <div className="flex flex-col justify-center p-8 lg:p-16">
            <span className="mb-4 text-sm font-bold uppercase tracking-wider text-accent/80">Real Estate Partners</span>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl font-display leading-tight">
              Grow neighborhood retail with Bokku.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
               Bokku works with landlords and agencies to secure strategic
               storefronts, expand access to daily essentials, and drive steady
               foot traffic for surrounding businesses.
            </p>
             <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
              <div>
                <strong className="block text-2xl font-bold text-white">110+</strong>
                <span className="text-sm text-slate-400">Active stores</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">Nationwide</strong>
                <span className="text-sm text-slate-400">Expansion</span>
              </div>
              <div>
                 <strong className="block text-2xl font-bold text-white">Long-term</strong>
                 <span className="text-sm text-slate-400">Partnerships</span>
              </div>
            </div>
           </div>
           
           <div className="bg-slate-800 p-8 lg:p-16 flex flex-col justify-center">
              <div className="rounded-2xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">What we bring</h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "Consistent traffic from loyal customers.",
                    "Store upgrades that enhance property value.",
                    "On-time rent with a professional team.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <i className="fa-solid fa-check mt-1 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded-xl bg-white py-4 text-center text-sm font-bold text-slate-900 transition hover:bg-accent">
                   Share an available space
                </button>
              </div>
           </div>
        </div>

        {/* Highlights */}
        <div className="mx-auto max-w-7xl px-4">
           <div className="mb-12 text-center">
             <h3 className="text-3xl font-bold text-slate-900 font-display">Ideal Locations</h3>
           </div>
           <div className="grid gap-8 md:grid-cols-3">
             <article className="rounded-2xl bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <i className="fa-solid fa-shop" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">Neighborhood Anchors</h4>
                <p className="text-slate-600">High-visibility corners, markets, and transit corridors with strong residential demand.</p>
             </article>
             <article className="rounded-2xl bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <i className="fa-solid fa-bolt" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">Reliable Utilities</h4>
                <p className="text-slate-600">Spaces with steady power access and logistics-friendly loading areas.</p>
             </article>
             <article className="rounded-2xl bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <i className="fa-solid fa-ruler-combined" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">Flexible Footprints</h4>
                <p className="text-slate-600">Retail-ready locations that can be tailored to Bokku store formats.</p>
             </article>
           </div>
        </div>
        
        {/* Steps */}
        <div className="bg-blue-950 py-16 -mx-4 px-4 md:-mx-8 md:px-8 text-white rounded-3xl">
           <div className="mx-auto max-w-5xl">
              <div className="mb-12 flex flex-col items-center text-center">
                  <h3 className="text-3xl font-bold font-display">How we partner</h3>
                  <p className="mt-4 text-slate-400">A streamlined process to get started.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-4">
                 {[
                   { step: "01", text: "Share property details and availability." },
                   { step: "02", text: "We review traffic, demographics, and fit." },
                   { step: "03", text: "Finalize lease terms and store design plan." },
                   { step: "04", text: "Launch with a dedicated store operations team." },
                 ].map((s) => (
                   <div key={s.step} className="relative rounded-2xl bg-white/5 p-6 border border-white/10">
                      <span className="absolute -top-4 -right-4 text-6xl font-black text-white/5">{s.step}</span>
                      <div className="relative">
                         <span className="mb-4 block text-accent font-bold">Step {s.step}</span>
                         <p className="text-slate-300">{s.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-12 text-center">
            <h3 className="mb-4 text-3xl font-bold text-slate-900 font-display">Ready to host a Bokku store?</h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
              Tell us about your property and we will reach out with next steps for partnership.
            </p>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition hover:bg-primary-dark">
               Start a property review
            </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default LandlordAgenciesPage;
