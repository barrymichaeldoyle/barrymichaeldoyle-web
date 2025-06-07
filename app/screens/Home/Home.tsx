import { HeroSection } from './sections/Hero/Hero';
import { ExperienceSection } from './sections/Experience/Experience';
import { ContactSection } from './sections/Contact/Contact';

export function HomeScreen() {
  return (
    <main className="container mx-auto space-y-16">
      <HeroSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
