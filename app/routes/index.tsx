import { createFileRoute } from '@tanstack/react-router';
import {
  Award,
  Calendar,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';

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

export const Route = createFileRoute('/')({
  component: Home,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-foreground">
              Barry Michael Doyle
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-semibold mb-8">
              Staff Frontend Engineer
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Passionate about building scalable, performant web applications
              that delight users. I lead frontend architecture, mentor
              engineering teams, and drive technical excellence at scale.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Cape Town, South Africa
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date().getFullYear() - 2013}+ Years Experience
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href="#experience">View Experience</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <a href="https://github.com" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <a href="https://linkedin.com" target="_blank">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </section>

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
              Let's Build Something Amazing
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

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Barry Michael Doyle</p>
        </div>
      </footer>
    </div>
  );
}
