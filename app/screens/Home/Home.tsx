import { Award, Download, Mail } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { experiences } from '@/data/experiences';

import { HeroSection } from './sections/Hero';

export function HomeScreen() {
  return (
    <main className="container mx-auto space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Experience Section */}
      <section id="experience" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track record of delivering high-impact solutions and leading
            engineering teams
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map(exp => (
            <Card key={exp.company} className="group p-6">
              <CardHeader className="p-0">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{exp.role}</CardTitle>
                    <CardDescription className="company-name text-lg font-medium">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge>{exp.years}</Badge>
                    <span className="text-muted-foreground text-xs">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <ul className="space-y-2">
                  {exp.achievements.map(achievement => (
                    <li key={achievement} className="flex items-start gap-2">
                      <Award className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Want to Poach Me?
          </h2>
          <p className="text-muted-foreground mb-8">
            Ready to discuss how I can contribute to your team's success? I'm
            always open to new opportunities and interesting challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="mailto:barry@barrymichaeldoyle.com">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <a href="/resume.pdf" target="_blank">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
