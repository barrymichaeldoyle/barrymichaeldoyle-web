import { Moon, Sun } from 'lucide-react';

import { type Theme, useTheme } from '@/components/theme/provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalize } from '@/lib/strings';

export function ThemeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-card"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <MenuItem theme="light" />
        <MenuItem theme="dark" />
        <MenuItem theme="system" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItem({ theme }: { theme: Theme }) {
  const { setTheme } = useTheme();

  function handleClick() {
    setTheme(theme);
  }

  const label = capitalize(theme);

  return <DropdownMenuItem onClick={handleClick}>{label}</DropdownMenuItem>;
}
