import { useState } from "react";
import PageLayout from "./PageLayout";

const LandlordAgenciesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    sizeSqft: "",
    floors: "",
    availableFrom: "",
    monthlyRent: "",
    leaseTerm: "",
    parkingSpaces: "",
    amenities: [] as string[],
    description: "",
    agreeTerms: false,
  });

  const amenityOptions = [
    "24/7 Power Supply",
    "Loading Bay",
    "CCTV / Security",
    "Borehole / Water Supply",
    "Air Conditioning",
    "Dedicated Signage Space",
    "Elevator / Lift",
    "Fire Suppression System",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "agreeTerms") {
      setForm((prev) => ({ ...prev, agreeTerms: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

        {/* CTA + Form */}
        <div id="property-review-form" className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12">
          {!showForm && !submitted && (
            <div className="text-center">
              <h3 className="mb-4 text-3xl font-bold text-slate-900 font-display">Ready to host a Bokku store?</h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
                Tell us about your property and we will reach out with next steps for partnership.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition hover:bg-primary-dark"
              >
                Start a property review
              </button>
            </div>
          )}

          {submitted && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
                <i className="fa-solid fa-circle-check text-4xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900 font-display">Submission Received!</h3>
              <p className="max-w-md text-slate-600">
                Thank you for submitting your property details. Our partnerships team will review your listing and be in touch within 3–5 business days.
              </p>
              <button
                onClick={() => { setSubmitted(false); setShowForm(false); }}
                className="mt-8 inline-flex h-10 items-center rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Submit another property
              </button>
            </div>
          )}

          {showForm && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">Property Review Form</h3>
                  <p className="mt-1 text-sm text-slate-500">Fill in all the details below so we can evaluate your property for a Bokku partnership.</p>
                </div>
                <button type="button" onClick={() => setShowForm(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span>
                  Contact Information
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">First Name <span className="text-red-500">*</span></label>
                    <input required name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="e.g. Chike" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                    <input required name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="e.g. Okonkwo" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+234 800 000 0000" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</span>
                  Property Details
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Property / Building Name <span className="text-red-500">*</span></label>
                    <input required name="propertyName" value={form.propertyName} onChange={handleChange} type="text" placeholder="e.g. Lekki Pearl Plaza" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Property Type <span className="text-red-500">*</span></label>
                    <select required name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white">
                      <option value="">Select type...</option>
                      <option>Shopping Mall Unit</option>
                      <option>Standalone Commercial Building</option>
                      <option>Ground Floor of Residential Block</option>
                      <option>Market Stall / Kiosk</option>
                      <option>Strip Mall / Plaza</option>
                      <option>Warehouse / Industrial Space</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Size (sq ft) <span className="text-red-500">*</span></label>
                    <input required name="sizeSqft" value={form.sizeSqft} onChange={handleChange} type="number" min="1" placeholder="e.g. 2500" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Number of Floors / Levels</label>
                    <input name="floors" value={form.floors} onChange={handleChange} type="number" min="1" placeholder="e.g. 1" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Parking Spaces Available</label>
                    <input name="parkingSpaces" value={form.parkingSpaces} onChange={handleChange} type="number" min="0" placeholder="e.g. 10" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span>
                  Location
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Street Address <span className="text-red-500">*</span></label>
                    <input required name="address" value={form.address} onChange={handleChange} type="text" placeholder="e.g. 15 Adeola Odeku Street, Victoria Island" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                    <input required name="city" value={form.city} onChange={handleChange} type="text" placeholder="e.g. Lagos" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">State <span className="text-red-500">*</span></label>
                    <input required name="state" value={form.state} onChange={handleChange} type="text" placeholder="e.g. Lagos State" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                </div>
              </div>

              {/* Commercial Terms */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">4</span>
                  Commercial Terms
                </h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Available From <span className="text-red-500">*</span></label>
                    <input required name="availableFrom" value={form.availableFrom} onChange={handleChange} type="date" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Monthly Rent (₦) <span className="text-red-500">*</span></label>
                    <input required name="monthlyRent" value={form.monthlyRent} onChange={handleChange} type="number" min="0" placeholder="e.g. 500000" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Preferred Lease Term</label>
                    <select name="leaseTerm" value={form.leaseTerm} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white">
                      <option value="">Select term...</option>
                      <option>1 Year</option>
                      <option>2 Years</option>
                      <option>3 Years</option>
                      <option>5 Years</option>
                      <option>Negotiable</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">5</span>
                  Available Amenities
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {amenityOptions.map((amenity) => (
                    <label key={amenity} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${form.amenities.includes(amenity) ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                      <input type="checkbox" className="hidden" checked={form.amenities.includes(amenity)} onChange={() => handleAmenityToggle(amenity)} />
                      <i className={`fa-solid ${form.amenities.includes(amenity) ? "fa-square-check text-primary" : "fa-square text-slate-300"}`} />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">6</span>
                  Additional Description
                </h4>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the property in detail — surroundings, foot traffic, notable landmarks nearby, unique selling points, etc."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none"
                />
              </div>

              {/* Terms */}
              <div className="rounded-xl bg-slate-50 p-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={form.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span>
                    I confirm that the information provided is accurate and I agree to Bokku's{" "}
                    <span className="font-semibold text-primary">Partnership Terms & Conditions</span>. I consent to being contacted by the Bokku real estate team.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-8 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark active:scale-95"
                >
                  Submit Property for Review <i className="fa-solid fa-arrow-right ml-2" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LandlordAgenciesPage;
