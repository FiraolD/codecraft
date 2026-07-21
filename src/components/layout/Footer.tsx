import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-codecraft-dark border-t border-white/5">
      <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-linear flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Code</span>
                <span className="gradient-text">Craft</span>
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              We transform complex challenges into elegant digital solutions.
              From cutting-edge web applications to AI-powered automation,
              we craft the future of technology.
            </p>
            <div className="flex items-center gap-4">
              <a href="" className="p-2 bg-codecraft-dark-2 rounded-lg text-slate-400 hover:text-white hover:bg-codecraft-accent-indigo/20 transition-all duration-200">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/FiraolD/" className="p-2 bg-codecraft-dark-2 rounded-lg text-slate-400 hover:text-white hover:bg-codecraft-accent-indigo/20 transition-all duration-200">
                <Github size={20} />
              </a>
              <a href="www.linkedin.com/in/firaoldelesa" className="p-2 bg-codecraft-dark-2 rounded-lg text-slate-400 hover:text-white hover:bg-codecraft-accent-indigo/20 transition-all duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors duration-200">Services</a></li>
              <li><a href="#portfolio" className="text-slate-400 hover:text-white transition-colors duration-200">Portfolio</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-slate-400">Web Development</span></li>
              <li><span className="text-slate-400">AI Automation</span></li>
              <li><span className="text-slate-400">Data Engineering</span></li>
              <li><span className="text-slate-400">Systems Design</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            2024 CodeCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}