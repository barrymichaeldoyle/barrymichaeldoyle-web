import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center pt-12 px-2">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="flex flex-col items-center justify-center gap-6 py-4 px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
            Barry Michael Doyle
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-semibold text-center">
            Staff Frontend Engineer
          </h2>
        </CardContent>
      </Card>
    </main>
  );
}
