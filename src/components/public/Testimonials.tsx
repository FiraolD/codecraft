import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const testimonials = [
  
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 bg-codecraft-dark-1 relative overflow-hidden">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-codecraft-accent-indigo font-medium mb-4 block">Testimonials</span>
          <h2 className="section-title mb-4">What Our Clients Say</h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass-card p-8 md:p-12 transition-all duration-500 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : index < currentIndex
                    ? 'opacity-0 -translate-x-full absolute inset-0'
                    : 'opacity-0 translate-x-full absolute inset-0'
                }`}
              >
                <Quote className="w-10 h-10 text-codecraft-accent-indigo/30 mb-6" />
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-codecraft-accent-indigo/30"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-codecraft-dark-2 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-codecraft-accent-indigo/30 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-codecraft-dark-2 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-codecraft-accent-indigo/30 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-linear'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}