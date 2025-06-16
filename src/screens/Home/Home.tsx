import { ContactSection } from '~/components/sections/Contact/Contact';

import { ExperienceSection } from './sections/Experience/Experience';
import { HeroSection } from './sections/Hero/Hero';

export function HomeScreen() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
