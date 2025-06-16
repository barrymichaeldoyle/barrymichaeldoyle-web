import { useEffect, useState } from 'react';

import { TITLES } from '~/constants';
import { cn } from '~/lib/utils';

export function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TITLES.length);
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
