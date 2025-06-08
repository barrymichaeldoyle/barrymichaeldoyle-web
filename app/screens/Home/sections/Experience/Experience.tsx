import { Award } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { experiences } from '@/screens/Home/sections/Experience/experiences';

export function ExperienceSection() {
  return (
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
        {experiences.map((exp) => (
          <Card key={exp.company} variant="feature" className="group p-6">
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
                {exp.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
