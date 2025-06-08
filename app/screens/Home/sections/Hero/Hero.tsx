import { Calendar, MapPin } from 'lucide-react';

import { LinkedIn } from '@/components/icons/LinkedIn';
import { Button, commonButtonGlowEffects } from '@/components/ui/button';
import { links, YEARS_EXPERIENCE } from '@/constants';
import { cn } from '@/lib/utils';

import { AnimatedTitle } from './AnimatedTitle';

export function HeroSection() {
  return (
    <section className="hero-particles text-center py-10 w-full">
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
        <p className="text-md text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Passionate about building scalable, performant web applications that
          delight users. I love diving deep into code, solving complex technical
          challenges, while also leading frontend architecture and mentoring
          engineering teams.
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
            <a href={links.linkedin} target="_blank">
              <LinkedIn className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
