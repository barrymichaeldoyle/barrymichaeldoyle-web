import { Link } from '@tanstack/react-router';

import { Badge } from '~/components/ui/badge';
import { sections } from '~/constants';

import {
  experiences,
  formatDuration,
  formatPeriod,
  getMonthsBetween,
} from './experiences';

const PX_PER_MONTH = 10;

export function ExperienceSection() {
  const now = new Date();
  const careerStart = experiences.at(-1)?.startDate;

  const experiencesWithHeight = experiences.map((exp, index) => {
    const prevExp = experiences[index - 1];

    // End dates should be treated as "end of month" - represent as first of next month
    // Start dates are already "beginning of month" which is correct
    let effectiveEnd: Date;
    if (exp.endDate === null) {
      // Present - first of next month from now
      effectiveEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else {
      // First of month after the end month
      effectiveEnd = new Date(
        exp.endDate.getFullYear(),
        exp.endDate.getMonth() + 1,
        1
      );
    }

    // Check if this job's end aligns with the previous (newer) job's start
    const overlapsWithPrev = prevExp
      ? Math.abs(getMonthsBetween(effectiveEnd, prevExp.startDate)) <= 1
      : false;

    const months = getMonthsBetween(exp.startDate, effectiveEnd);
    const height = months * PX_PER_MONTH;

    return { ...exp, months, height, overlapsWithPrev, effectiveEnd };
  });

  // Calculate cumulative heights for positioning
  let cumulativeHeight = 0;
  const experiencesWithPosition = experiencesWithHeight.map((exp) => {
    const startY = cumulativeHeight;
    cumulativeHeight += exp.height;
    return { ...exp, startY, endY: cumulativeHeight };
  });

  // Generate year markers by finding where each Jan 1 falls
  const startYear = careerStart?.getFullYear() ?? now.getFullYear();
  const endYear = now.getFullYear();
  const yearMarkers: { year: number; position: number; isRight: boolean }[] =
    [];

  for (let year = endYear; year >= startYear; year--) {
    const yearDate = new Date(year, 0, 1); // Jan 1 of this year

    // Skip if this date is in the future
    if (yearDate > now) continue;

    // Find which job this year falls within
    const jobIndex = experiencesWithPosition.findIndex((exp) => {
      return yearDate < exp.effectiveEnd && yearDate >= exp.startDate;
    });

    if (jobIndex === -1) continue;

    const job = experiencesWithPosition[jobIndex];
    const jobEnd = job.effectiveEnd;
    const jobStart = job.startDate;
    const jobMonths = getMonthsBetween(jobStart, jobEnd);
    const monthsFromJobEnd = getMonthsBetween(yearDate, jobEnd);

    // Calculate position within this job's visual segment
    const proportionInJob = jobMonths > 0 ? monthsFromJobEnd / jobMonths : 0;
    const position = job.startY + proportionInJob * job.height;

    // Year marker should be on opposite side of job bracket
    const isJobBracketLeft = jobIndex % 2 === 0;
    const isRight = isJobBracketLeft;

    yearMarkers.push({ year, position, isRight });
  }

  const isFirstJob = (index: number) => index === 0;
  const isLastJob = (index: number) => index === experiences.length - 1;

  return (
    <section id={sections.experience} className="px-2 py-10">
      <div className="mb-12 text-center">
        <Link to={`#${sections.experience}` as string} data-slot="button">
          <h2 className="mb-20 text-3xl font-bold text-cyan-400 sm:mb-4">
            Professional Experience
          </h2>
        </Link>
      </div>

      <div className="mx-auto max-w-3xl py-8">
        <div className="relative">
          {/* Timeline line - centered, extends beyond content */}
          <div className="absolute -top-4 -bottom-4 left-1/2 w-1 -translate-x-1/2 bg-primary/30" />

          {/* Year markers */}
          {yearMarkers.map(({ year, position, isRight }) => (
            <div
              key={year}
              className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center"
              style={{ top: position }}
            >
              {/* Tick mark */}
              <div
                className={`absolute h-0.5 w-3 bg-primary/25 ${
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
          ))}

          {experiencesWithPosition.map((exp, index) => {
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
                  <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
                    <div
                      className={`rounded-full border-4 border-cyan-400 bg-background shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                        isFirst ? 'h-5 w-5' : 'h-4 w-4'
                      }`}
                    />
                  </div>
                )}

                {/* Bottom dot - always show, larger if last job */}
                <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
                  <div
                    className={`relative rounded-full border-4 border-cyan-400 bg-background shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                      isLast ? 'top-2 h-5 w-5' : 'top-1.5 h-4 w-4'
                    }`}
                  />
                </div>

                {/* Present indicator - diagonal tick + label for current role */}
                {isLast && exp.endDate === null && (
                  <div
                    className={`absolute bottom-1 left-1/2 z-10 flex items-center gap-1.5 ${
                      isLeft ? 'origin-bottom-left' : 'origin-bottom-right'
                    }`}
                    style={{
                      transform: isLeft
                        ? 'translateX(4px) rotate(-40deg)'
                        : 'translateX(calc(-100% - 4px)) rotate(40deg)',
                    }}
                  >
                    <div className="h-0.5 w-6 shrink-0 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                    <span className="text-xs font-semibold whitespace-nowrap text-cyan-400">
                      Present
                    </span>
                  </div>
                )}

                {/* Fork bracket - neon path branches */}
                <div
                  className={`absolute top-0 bottom-0 w-16 ${
                    isLeft ? 'right-1/2' : 'left-1/2'
                  }`}
                >
                  {/* Top horizontal line */}
                  <div
                    className={`absolute top-0 h-0.5 w-4 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                      isLeft ? 'right-0' : 'left-0'
                    }`}
                  />
                  {/* Vertical line */}
                  <div
                    className={`absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                      isLeft ? 'right-4' : 'left-4'
                    }`}
                  />
                  {/* Bottom horizontal line */}
                  <div
                    className={`absolute bottom-0 h-0.5 w-4 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                      isLeft ? 'right-0' : 'left-0'
                    }`}
                  />
                  {/* Line to card - shorter on small screens to give card more width */}
                  <div
                    className={`absolute top-1/2 h-0.5 -translate-y-1/2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
                      isLeft
                        ? 'right-4 left-8 sm:left-0'
                        : 'right-8 left-4 sm:right-0'
                    }`}
                  />
                </div>

                {/* Content card - more width on small screens with shorter line to card */}
                <div
                  className={`absolute top-1/2 w-[calc(50%-2rem)] -translate-y-1/2 sm:w-[calc(50%-4rem)] ${
                    isLeft ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="rounded-lg border-2 border-cyan-400/80 bg-background-secondary/50 p-2 shadow-[0_0_12px_rgba(34,211,238,0.4)] backdrop-blur-sm sm:p-4">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-cyan-400 hover:underline"
                      >
                        {exp.company}
                      </a>
                      <Badge className="w-fit shrink-0 bg-cyan-400/90 text-black">
                        {formatDuration(exp.months)}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-foreground italic">
                      {exp.role}
                    </p>
                    <p className="mt-1 text-xs text-cyan-400/70">
                      {formatPeriod(exp.startDate, exp.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
