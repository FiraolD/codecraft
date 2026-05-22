import { Monitor, Brain, Database, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const services = [
  {
    icon: Monitor,
    title: 'Web & Systems Development',
    description: 'Crafting high-performance web applications and robust systems architecture tailored to your business needs.',
    features: ['Custom Web Applications', 'API Development', 'System Architecture', 'Cloud Deployment'],
  },
  {
    icon: Brain,
    title: 'AI Automation',
    description: 'Leveraging cutting-edge AI to automate workflows, enhance decision-making, and unlock new possibilities.',
    features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Intelligent Automation'],
  },
  {
    icon: Database,
    title: 'Data Engineering & Analytics',
    description: 'Transforming raw data into actionable insights with scalable pipelines and advanced analytics solutions.',
    features: ['Data Pipelines', 'Business Intelligence', 'Predictive Analytics', 'Data Visualization'],
  },
];

export function Services() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-codecraft-accent-indigo font-medium mb-4 block">What We Do</span>
          <h2 className="section-title mb-4">Our Core Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We specialize in three interconnected disciplines that drive digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative glass-card p-8 transition-all duration-500 hover:border-codecraft-accent-indigo/30 hover:shadow-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-linear flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 bg-codecraft-accent-indigo rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="flex items-center gap-2 text-codecraft-accent-indigo font-medium group-hover:gap-3 transition-all duration-200">
                Learn More
                <ArrowRight size={16} />
              </button>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-linear opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}