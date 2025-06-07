import { Calendar, Github, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button, commonButtonGlowEffects } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LinkedIn } from '@/components/icons/LinkedIn';
import { socials, TITLES, YEARS_EXPERIENCE } from '@/constants';

export function HeroSection() {
  return (
    <section className="hero-particles text-center py-16 w-full">
      <div className="hero-particles-medium" />
      <div className="hero-particle-overlay" />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Profile Picture */}
        <div className="mb-8 flex justify-center">
          <div
            className={cn(
              'w-40 h-40 rounded-full overflow-hidden border-8 border-primary/20 dark:border-primary/80 transition-all duration-300 hover:scale-105',
              commonButtonGlowEffects
            )}
          >
            <img
              src="/barrymichaeldoyle.png"
              alt="Barry Michael Doyle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-foreground">
          Barry Michael Doyle
        </h1>
        <AnimatedTitle />
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Passionate about building scalable, performant web applications that
          delight users. I lead frontend architecture, mentor engineering teams,
          and drive technical excellence at scale.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Cape Town, South Africa
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {YEARS_EXPERIENCE}+ Years Professional Experience
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#experience">View Experience</a>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href={socials.linkedin} target="_blank">
              <LinkedIn className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % TITLES.length);
        setIsVisible(true); // Fade back in
      }, 300); // Half of transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2
      className={cn(
        `text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-semibold mb-8 transition-opacity duration-500`,
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {TITLES[currentIndex]}
    </h2>
  );
}
