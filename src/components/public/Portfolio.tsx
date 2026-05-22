import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useProjects } from '../../hooks/useData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { Project } from '../../types';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Development' },
  { value: 'ai', label: 'AI Projects' },
  { value: 'data', label: 'Data Engineering' },
];

export function Portfolio() {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, isVisible } = useIntersectionObserver();

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-codecraft-dark-1 relative">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-codecraft-accent-cyan font-medium mb-4 block">Our Work</span>
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions that have delivered measurable results.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? 'bg-gradient-linear text-white'
                  : 'bg-codecraft-dark-2 text-slate-400 hover:text-white hover:bg-codecraft-dark-2/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isVisible={isVisible} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const categoryColors = {
    web: 'bg-codecraft-accent-indigo',
    ai: 'bg-codecraft-accent-violet',
    data: 'bg-codecraft-accent-cyan',
  };

  return (
    <div
      className={`group relative glass-card overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-glow ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-codecraft-dark">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-linear opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-codecraft-dark via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[project.category]} text-white`}>
            {project.category.toUpperCase()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-codecraft-accent-indigo transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-codecraft-dark rounded text-slate-500">
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-codecraft-accent-indigo text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            View Project
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}