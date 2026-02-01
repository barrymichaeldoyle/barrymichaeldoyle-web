import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { sections } from '~/constants';

import { projects } from './projectsData';

export function ProjectsSection() {
  return (
    <section id={sections.projects} className="px-4 pt-20">
      <div className="mb-12 text-center">
        <Link to={`#${sections.projects}` as string} data-slot="button">
          <h2 className="mb-4 text-3xl font-bold">Projects</h2>
        </Link>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Side projects and open source contributions I&apos;m proud of
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name} variant="feature" className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-1 text-xl text-primary">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {project.name}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {project.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
              <p className="text-muted-foreground text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
