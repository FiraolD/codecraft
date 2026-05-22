import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlowOrbs } from '../components/public/GlowOrbs';
import { Hero } from '../components/public/Hero';
import { Services } from '../components/public/Services';
import { Portfolio } from '../components/public/Portfolio';
import { About } from '../components/public/About';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';

export function HomePage() {
  return (
    <div className="min-h-screen bg-codecraft-dark">
      <GlowOrbs />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}