import { ThemeToggle } from '../theme/toggle';

export function Header() {
  return (
    <header className="absolute right-0 top-0 p-1 z-1">
      <ThemeToggle />
    </header>
  );
}
