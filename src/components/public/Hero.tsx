import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const heroText = "We Craft Digital Excellence";

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && textIndex < heroText.length) {
        setTextIndex((prev) => prev + 1);
      } else if (isDeleting && textIndex > 0) {
        setTextIndex((prev) => prev - 1);
      } else if (textIndex === heroText.length && !isDeleting) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (textIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [textIndex, isDeleting]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-codecraft-dark-1/80 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-slate-300">Now accepting new projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in stagger-1">
            <span className="text-white">We Build </span>
            <span className="gradient-text">
              {heroText.substring(0, textIndex)}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-in stagger-2">
            From sophisticated web applications to AI-powered automation and
            advanced data engineering — we transform your vision into digital reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in stagger-3">
            <button
              onClick={scrollToServices}
              className="btn-primary flex items-center gap-2 group"
            >
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="btn-outline flex items-center gap-2 group"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              Start a Project
            </button>
          </div>

          {/* Stats */}
       
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-codecraft-accent-indigo rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}