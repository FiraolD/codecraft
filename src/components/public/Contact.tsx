import { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { useMessages } from '../../hooks/useData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { ContactFormData } from '../../types';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'web', label: 'Web & Systems Development' },
  { value: 'ai', label: 'AI Automation' },
  { value: 'data', label: 'Data Engineering & Analytics' },
  { value: 'other', label: 'Other' },
];

export function Contact() {
  const { submitMessage } = useMessages();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service_interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { ref, isVisible } = useIntersectionObserver();

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.service_interest) newErrors.service_interest = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', service_interest: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-codecraft-accent-indigo font-medium mb-4 block">Contact Us</span>
          <h2 className="section-title mb-4">Let's Start a Conversation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch and let's discuss how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`glass-card p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="John Smith"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service_interest" className="block text-sm font-medium text-slate-300 mb-2">
                  Service Interest
                </label>
                <select
                  id="service_interest"
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleChange}
                  className={`input-field ${errors.service_interest ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-codecraft-dark">
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.service_interest && <p className="mt-1 text-sm text-red-500">{errors.service_interest}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`input-field resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500 text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-codecraft-dark-2 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-codecraft-accent-indigo" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Email</div>
                    <a href="mailto:hello@codecraft.dev" className="text-white hover:text-codecraft-accent-indigo transition-colors">
                      hello@codecraft.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-codecraft-dark-2 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-codecraft-accent-violet" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Phone</div>
                    <a href="tel:+1234567890" className="text-white hover:text-codecraft-accent-indigo transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-codecraft-dark-2 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-codecraft-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Location</div>
                    <span className="text-white">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card p-8 border-codecraft-accent-indigo/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">Typically Respond Within</span>
              </div>
              <p className="text-3xl font-bold gradient-text">24 Hours</p>
              <p className="text-slate-500 mt-2">For all project inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}