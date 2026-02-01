import { ContactSection } from '~/components/sections/Contact/Contact';

import { AboutSection } from './sections/About/About';
import { ExperienceSection } from './sections/Experience/Experience';
import { HeroSection } from './sections/Hero/Hero';
import { ProjectsSection } from './sections/Projects/Projects';

export function HomeScreen() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
