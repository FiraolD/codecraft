import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-codecraft-dark/90 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container 2xl:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
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

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-codecraft-dark/98 backdrop-blur-xl flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}