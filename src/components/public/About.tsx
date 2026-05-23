import { Users, Target, Zap, Award } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const stats = [
  { value: '50+', label: 'Projects Delivered', icon: Zap },
  { value: '30+', label: 'Happy Clients', icon: Users },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '5+', label: 'Years of Excellence', icon: Target },
];

const values = [
  {
    title: 'Innovation First',
    description: 'We constantly push boundaries to deliver cutting-edge solutions that set new industry standards.',
  },
  {
    title: 'Quality Obsessed',
    description: 'Every line of code, every design decision is made with meticulous attention to quality and detail.',
  },
  {
    title: 'Client Partnership',
    description: 'We view our clients as partners, working collaboratively to achieve shared success.',
  },
];

export function About() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-codecraft-accent-violet font-medium mb-4 block">About Us</span>
          <h2 className="section-title mb-4">Crafting Digital Excellence</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            We're a team of passionate technologists dedicated to transforming complex challenges
            into elegant, scalable digital solutions. Our expertise spans the entire digital landscape.
          </p>
        </div>

        

        {/* Values
         */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`p-8 border-l-2 border-codecraft-accent-indigo/30 hover:border-codecraft-accent-indigo transition-colors duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}