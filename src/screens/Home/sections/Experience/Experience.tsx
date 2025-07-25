import { Link } from '@tanstack/react-router';
import { Award } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { sections } from '~/constants';
import { experiences } from '~/screens/Home/sections/Experience/experiences';

export function ExperienceSection() {
  return (
    <section id={sections.experience} className="px-4 py-10">
      <div className="mb-12 text-center">
        <Link to={`#${sections.experience}` as string} data-slot="button">
          <h2 className="mb-4 text-3xl font-bold">Professional Experience</h2>
        </Link>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          These are all the places that I&apos;ve worked at full time 🎉
        </p>
      </div>
      <div className="mx-auto max-w-4xl space-y-8">
        {experiences.map((exp) => (
          <Card key={exp.company} variant="feature">
            <CardHeader>
              <div className="flex items-start justify-between py-4">
                <div>
                  <CardTitle className="mb-1 text-xl text-primary">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-lg font-normal">
                    <em>{exp.role}</em>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <Badge className="sm:px-4 sm:py-2">{exp.years}</Badge>
                  <span className="text-xs">{exp.period}</span>
                </div>
              </div>
            </CardHeader>
            {exp.achievements.length > 0 && (
              <CardContent className="mt-4 p-0">
                <ul className="space-y-2">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2">
                      <Award className="text-accent mt-1 h-4 w-4 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
