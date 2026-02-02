import PageLayout from "./PageLayout";

const SupplierPage = () => {
  return (
    <PageLayout
      title="Supplier Partnerships"
      description="Join our network of suppliers and manufacturers to bring quality goods to Nigerian households."
    >
      <div className="flex flex-col gap-12 lg:gap-24">
         {/* Hero */}
         <div className="relative overflow-hidden rounded-3xl bg-blue-950 shadow-2xl lg:grid lg:min-h-[500px] lg:grid-cols-2">
           <div className="flex flex-col justify-center p-8 lg:p-16">
            <span className="mb-4 text-sm font-bold uppercase tracking-wider text-accent/80">Work with Bokku</span>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl font-display leading-tight">
              Dear Suppliers and Manufacturers
            </h2>
             <div className="space-y-4 text-lg text-slate-300 leading-relaxed mb-8">
               <p>
                Interested in growing with bokku!? Since 2022, bokku! has
                offered an intentionally different shopping experience where
                customers never have to compromise on quality or value.
              </p>
              <p>
                As we continue to expand across the country, we are constantly
                looking for new suppliers that can help us improve our
                assortment. We always aim for long-term relationships that grow alongside our business.
              </p>
             </div>
             
             <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
              <div>
                <strong className="block text-2xl font-bold text-white">110+</strong>
                <span className="text-sm text-slate-400">Stores</span>
              </div>
              <div>
                <strong className="block text-2xl font-bold text-white">2022</strong>
                <span className="text-sm text-slate-400">Founded</span>
              </div>
               <div>
                <strong className="block text-2xl font-bold text-white">Fast</strong>
                <span className="text-sm text-slate-400">Growth</span>
              </div>
            </div>
           </div>
           
           <div className="bg-slate-800 p-8 lg:p-16 flex flex-col justify-center">
               <div className="rounded-2xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Become a bokku! Supplier</h3>
                <p className="text-slate-300 mb-8">
                   Please take the first step toward a profitable, long-term
                   partnership with us. Visit a bokku! store and review our FAQs below.
                </p>
                <div className="flex flex-col gap-4">
                  <span className="text-sm text-slate-400">Questions? Contact <a href="mailto:purchasing@atreos.com" className="text-accent hover:underline">purchasing@atreos.com</a></span>
                  <button className="w-full rounded-xl bg-white py-4 text-center text-sm font-bold text-slate-900 transition hover:bg-accent">
                     Start a supplier conversation
                  </button>
                </div>
              </div>
           </div>
         </div>

         {/* Benefits */}
         <div className="mx-auto max-w-7xl px-4">
             <div className="rounded-3xl bg-slate-100 p-8 md:p-12">
               <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center font-display">When you partner with bokku! you can expect:</h3>
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    "Fast growth based on sales volume and expansion.",
                    "Efficient deliveries to a central warehouse.",
                    "Close cooperation and business planning.",
                    "We always pay on time.",
                  ].map((benefit, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm">
                       <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                         <i className="fa-solid fa-check" />
                       </div>
                       <p className="font-medium text-slate-800">{benefit}</p>
                    </div>
                  ))}
               </div>
             </div>
         </div>
         
         {/* Expectations */}
         <div className="grid gap-12 lg:grid-cols-2 items-center mx-auto max-w-7xl px-4">
            <div>
               <h3 className="text-3xl font-bold text-slate-900 font-display mb-6">Our Expectations</h3>
               <p className="text-lg text-slate-600 mb-6">
                 We believe in fair partnerships. We do not require suppliers to pay or manage any extras, such as:
               </p>
               <ul className="space-y-4">
                  {[
                    "Unwarranted deductions.",
                    "Coupons or promotions.",
                    "Marketing, food shows or listing fees.",
                    "In-store displays or rack-jobbing.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                       <i className="fa-solid fa-xmark text-red-500 text-lg" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-3xl bg-slate-200">
               <img src="/assets/sliderimage/slider1.jpg" alt="Bokku Store Shelf" className="h-full w-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">Just great products on shelves.</p>
               </div>
            </div>
         </div>
         
         {/* CTA */}
         <div className="text-center bg-primary py-16 -mx-4 px-4 md:-mx-8 md:px-8 text-white">
            <h3 className="text-3xl font-bold font-display mb-4">Start your journey today</h3>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Ready to grow with a partner that values quality, scale, and
              long-term collaboration? Visit a bokku! store to get started.
            </p>
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-primary transition hover:bg-slate-100">
               Find a store near you
            </button>
         </div>
      </div>
    </PageLayout>
  );
};

export default SupplierPage;
