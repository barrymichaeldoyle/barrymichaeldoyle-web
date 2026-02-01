export interface Experience {
  company: string;
  companyUrl: string;
  role: string;
  startDate: Date;
  endDate: Date | null; // null = present
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: 'VALR (PTY) Ltd',
    companyUrl: 'https://www.valr.com/en/invite/VAVCTUC7',
    role: 'Senior Software Engineer',
    startDate: new Date(2025, 8), // Sep 2025
    endDate: null,
    achievements: [],
  },
  {
    company: 'SecuritEase International Australia (PTY) Ltd',
    companyUrl: 'https://www.securitease.com/',
    role: 'UI Chapter Lead (Engineer)',
    startDate: new Date(2023, 2), // Mar 2023
    endDate: new Date(2025, 7), // Aug 2025
    achievements: [],
  },
  {
    company: 'Join Odin Limited',
    companyUrl: 'https://www.joinodin.com/',
    role: 'Design Engineer',
    startDate: new Date(2022, 3), // Apr 2022
    endDate: new Date(2023, 1), // Feb 2023
    achievements: [],
  },
  {
    company: 'Universal Healthcare Group',
    companyUrl: 'https://universal.one/',
    role: 'Head of Frontend Engineering',
    startDate: new Date(2019, 2), // Mar 2019
    endDate: new Date(2022, 2), // Mar 2022
    achievements: [],
  },
  {
    company: 'Cardinal (PTY) Ltd',
    companyUrl: 'https://www.cardinal.co.za/',
    role: 'Senior Frontend Engineer',
    startDate: new Date(2017, 9), // Oct 2017
    endDate: new Date(2019, 1), // Feb 2019
    achievements: [],
  },
  {
    company: 'Barry-Dean IT Solutions (B1TS)',
    companyUrl: 'https://www.linkedin.com/in/barry-dean-martin-b69441b8/',
    role: 'Software Engineer',
    startDate: new Date(2013, 0), // Jan 2013
    endDate: new Date(2017, 8), // Sep 2017
    achievements: [],
  },
];

export function getMonthsBetween(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
}

export function formatDuration(months: number): string {
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  const years = months / 12;
  if (years % 1 === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years.toFixed(1)} years`;
}

export function formatPeriod(start: Date, end: Date | null): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const startStr = `${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  const endStr = end
    ? `${monthNames[end.getMonth()]} ${end.getFullYear()}`
    : 'Present';
  return `${startStr} - ${endStr}`;
}
