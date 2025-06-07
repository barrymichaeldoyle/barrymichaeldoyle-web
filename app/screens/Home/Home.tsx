import { ContactSection } from './sections/Contact/Contact';
import { ExperienceSection } from './sections/Experience/Experience';
import { HeroSection } from './sections/Hero/Hero';

export function HomeScreen() {
  return (
    <main className="container mx-auto space-y-16 px-3">
      <HeroSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
