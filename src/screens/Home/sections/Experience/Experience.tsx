import { Link } from '@tanstack/react-router';

import { Badge } from '~/components/ui/badge';
import { sections } from '~/constants';

import {
  experiences,
  formatDuration,
  formatPeriod,
  getMonthsBetween,
} from './experiences';

const MIN_HEIGHT_PX = 160;
const PX_PER_MONTH = 8;

export function ExperienceSection() {
  const now = new Date();
  const careerStart = experiences.at(-1)?.startDate;
  const totalMonths = getMonthsBetween(careerStart ?? now, now);

  const experiencesWithHeight = experiences.map((exp, index) => {
    const prevExp = experiences[index - 1];

    // If this job's end is close to the previous job's start, use the previous job's start
    // as this job's end to eliminate gaps
    let endDate = exp.endDate ?? now;
    const gapWithPrev = prevExp
      ? Math.abs(getMonthsBetween(endDate, prevExp.startDate))
      : Infinity;
    const overlapsWithPrev = gapWithPrev <= 2;

    if (overlapsWithPrev && prevExp) {
      endDate = prevExp.startDate;
    }

    const months = getMonthsBetween(exp.startDate, endDate);
    const height = Math.max(MIN_HEIGHT_PX, months * PX_PER_MONTH);

    return { ...exp, months, height, overlapsWithPrev, endDate };
  });

  // Calculate total timeline height
  const totalHeight = experiencesWithHeight.reduce(
    (sum, exp) => sum + exp.height,
    0
  );

  // Calculate cumulative heights to know which job each year falls in
  const cumulativeHeights = experiencesWithHeight.reduce<number[]>(
    (acc, exp, i) => {
      const prev = acc[i - 1] ?? 0;
      acc.push(prev + exp.height);
      return acc;
    },
    []
  );

  // Generate year markers
  const startYear = careerStart?.getFullYear() ?? now.getFullYear();
  const endYear = now.getFullYear();
  const yearMarkers: { year: number; position: number; isRight: boolean }[] =
    [];

  for (let year = endYear; year >= startYear; year--) {
    // Calculate months from "now" to Jan 1st of this year
    const yearStart = new Date(year, 0, 1);
    const monthsFromNow = getMonthsBetween(yearStart, now);
    // Position as percentage of total timeline
    const position = (monthsFromNow / totalMonths) * totalHeight;

    // Find which job this year falls within
    const jobIndex = cumulativeHeights.findIndex((h) => position < h);
    const actualJobIndex = jobIndex === -1 ? experiences.length - 1 : jobIndex;

    // Job brackets: even index = left, odd index = right
    // Year marker should be on opposite side
    const isJobBracketLeft = actualJobIndex % 2 === 0;
    const isRight = isJobBracketLeft; // opposite of job bracket

    yearMarkers.push({ year, position, isRight });
  }

  const isFirstJob = (index: number) => index === 0;
  const isLastJob = (index: number) => index === experiences.length - 1;

  return (
    <section id={sections.experience} className="px-4 py-10">
      <div className="mb-12 text-center">
        <Link to={`#${sections.experience}` as string} data-slot="button">
          <h2 className="mb-4 text-3xl font-bold">Professional Experience</h2>
        </Link>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          {experiences.length} roles over{' '}
          {formatDuration(
            getMonthsBetween(experiences.at(-1)?.startDate ?? now, now)
          )}
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl py-8">
        {/* Timeline line - centered, extends beyond content */}
        <div className="absolute -top-4 -bottom-4 left-1/2 w-0.5 -translate-x-1/2 bg-primary/30" />

        {/* Year markers */}
        {yearMarkers.map(({ year, position, isRight }) => {
          return (
            <div
              key={year}
              className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center"
              style={{ top: position }}
            >
              {/* Tick mark */}
              <div
                className={`absolute h-px w-3 bg-primary/20 ${
                  isRight ? 'left-1' : 'right-1'
                }`}
              />
              {/* Year label */}
              <span
                className={`text-muted-foreground/50 absolute text-xs ${
                  isRight ? 'left-5' : 'right-5'
                }`}
              >
                {year}
              </span>
            </div>
          );
        })}

        {experiencesWithHeight.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const isFirst = isFirstJob(index);
          const isLast = isLastJob(index);

          return (
            <div
              key={exp.company}
              className="relative"
              style={{ height: exp.height }}
            >
              {/* Top dot - only show if first job or doesn't overlap with prev */}
              {(isFirst || !exp.overlapsWithPrev) && (
                <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
                  <div
                    className={`rounded-full border-2 border-primary bg-background ${
                      isFirst ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'
                    }`}
                  />
                </div>
              )}

              {/* Bottom dot - always show, larger if last job */}
              <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
                <div
                  className={`rounded-full border-2 border-primary bg-background ${
                    isLast ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'
                  }`}
                />
              </div>

              {/* Fork bracket */}
              <div
                className={`absolute top-[5px] bottom-[5px] w-16 ${
                  isLeft ? 'right-1/2' : 'left-1/2'
                }`}
              >
                {/* Top horizontal line */}
                <div
                  className={`absolute top-0 h-0.5 w-4 bg-primary/40 ${
                    isLeft ? 'right-0' : 'left-0'
                  }`}
                />
                {/* Vertical line */}
                <div
                  className={`absolute top-0 bottom-0 w-0.5 bg-primary/40 ${
                    isLeft ? 'right-4' : 'left-4'
                  }`}
                />
                {/* Bottom horizontal line */}
                <div
                  className={`absolute bottom-0 h-0.5 w-4 bg-primary/40 ${
                    isLeft ? 'right-0' : 'left-0'
                  }`}
                />
                {/* Line to card */}
                <div
                  className={`absolute top-1/2 h-0.5 -translate-y-1/2 bg-primary/40 ${
                    isLeft ? 'right-4 left-0' : 'right-0 left-4'
                  }`}
                />
              </div>

              {/* Content card */}
              <div
                className={`absolute top-1/2 w-[calc(50%-4rem)] -translate-y-1/2 ${
                  isLeft ? 'left-0' : 'right-0'
                }`}
              >
                <div className="rounded-lg border border-primary/20 bg-background-secondary/50 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-primary hover:underline"
                    >
                      {exp.company}
                    </a>
                    <Badge className="shrink-0">
                      {formatDuration(exp.months)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm italic">
                    {exp.role}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {formatPeriod(exp.startDate, exp.endDate)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
