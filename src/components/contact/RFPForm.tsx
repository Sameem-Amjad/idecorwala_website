'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function RFPForm() {
  const [formData, setFormData] = useState({
    fullName: "", 
    email: "", 
    company: "",
    projectType: "", 
    budgetRange: "", 
    timeline: "",
    phone: "", 
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      console.log('RFP Form Submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClasses = "w-full border border-[#D8CEBC] rounded-[6px] bg-white px-4 py-3 text-[14px] text-[#1A1614] placeholder-[#A09890] focus:outline-none focus:border-[#C9A050] focus:ring-1 focus:ring-[#C9A050] transition-colors";

  return (
    <section id="rfp-form" className="w-full bg-[#F5EFE6] pb-[clamp(48px,6vw,80px)] z-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Outer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="w-full border border-[#E2D5C0] rounded-[16px] bg-[#FDFAF6] p-[clamp(40px,4vw,64px)] relative overflow-hidden"
        >
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            
            {/* Left Column (Copy - 35%) */}
            <div className="w-full lg:w-[35%] flex flex-col relative z-10 lg:pr-10">
              
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#B01219] font-inter block mb-3">
                Request For
              </span>
              
              <h2 className="text-[clamp(36px,4.5vw,56px)] font-cormorant font-semibold text-[#B01219] leading-none mb-5">
                PROPOSAL
              </h2>
              
              <div className="w-10 h-[2px] bg-[#C9A050] mb-5" />
              
              <p className="text-[14px] text-[#4A4540] leading-[1.65] font-inter max-w-[280px]">
                Tell us about your project. Our specialists will review your requirements and respond within 24 hours.
              </p>

              {/* Decorative Architectural Sketch (Desktop only, partially hidden) */}
              <div className="hidden lg:block absolute -bottom-[64px] -left-[64px] w-[200px] h-[180px] opacity-40 pointer-events-none mix-blend-multiply">
                <Image
                  src="/images/contact/rfp_building.png"
                  alt="Decorative building sketch"
                  fill
                  className="object-contain object-bottom-left"
                />
              </div>
            </div>

            {/* Vertical Divider (Desktop only) */}
            <div className="hidden lg:block w-[1px] bg-[#E2D5C0] flex-shrink-0" />

            {/* Right Column (Form - 65%) */}
            <div className="w-full lg:w-[65%] lg:pl-[clamp(28px,3vw,48px)] z-10">
              
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-cormorant font-semibold text-[#1A1614] mb-2">Request Received</h3>
                  <p className="text-[#4A4540] font-inter text-sm max-w-md mx-auto">
                    Thank you for submitting your project details. Our specialists will review your RFP and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* Row 1 */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name *" required className={inputClasses} />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required className={inputClasses} />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company / Organization" className={inputClasses} />
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 relative">
                      <select name="projectType" value={formData.projectType} onChange={handleChange} required className={`${inputClasses} appearance-none`}>
                        <option value="" disabled hidden>Project Type *</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="workplace">Workplace & Corporate</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="other">Other</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C9A050]">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 relative">
                      <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                        <option value="" disabled hidden>Budget Range</option>
                        <option value="under_50l">Under ₹50 Lacs</option>
                        <option value="50l_1cr">₹50 Lacs - ₹1 Cr</option>
                        <option value="1cr_5cr">₹1 Cr - ₹5 Cr</option>
                        <option value="above_5cr">Above ₹5 Cr</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C9A050]">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 relative">
                      <select name="timeline" value={formData.timeline} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                        <option value="" disabled hidden>Timeline</option>
                        <option value="immediate">Immediate (1-3 months)</option>
                        <option value="soon">Soon (3-6 months)</option>
                        <option value="planning">Planning phase (6+ months)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C9A050]">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className={inputClasses} />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us more about your project..." 
                      className={`${inputClasses} min-h-[120px] resize-y`}
                    />
                  </div>

                  {/* Submit Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-5">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-[#B01219] text-white text-[13px] uppercase tracking-[0.1em] px-8 py-3.5 rounded font-satoshi font-bold hover:bg-[#8e0f14] hover:-translate-y-[1px] hover:shadow-md transition-all duration-300 w-max disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit RFP \u2192'}
                    </button>
                    
                    <div className="flex items-center text-[#C9A050] font-inter text-[13px]">
                      <Clock className="w-4 h-4 mr-2" strokeWidth={2} />
                      Response within 24 hours
                    </div>
                  </div>

                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
