import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { ThemeProvider } from '../provider';
import { ThemeToggle } from '../toggle';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  afterEach(() => {
    cleanup();
  });

  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should use default theme when no theme is stored', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('light'); // system defaults to light when matchMedia is false
  });

  it('should use stored theme from localStorage', () => {
    localStorage.setItem('vite-ui-theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('dark');
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  afterEach(() => {
    cleanup();
  });

  it('should render toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeVisible();
  });

  it('should show dropdown menu when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    waitFor(() => {
      fireEvent.click(button);
    });

    waitFor(() => {
      expect(screen.getByText('Light')).toBeVisible();
      expect(screen.getByText('Dark')).toBeVisible();
      expect(screen.getByText('System')).toBeVisible();
    });
  });

  it('should change theme when menu item is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Open dropdown
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    waitFor(() => {
      fireEvent.click(toggleButton);
    });

    // Click dark theme
    waitFor(() => {
      fireEvent.click(screen.getByText('Dark'));
    });

    waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
      expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    });

    // Open dropdown again
    waitFor(() => {
      fireEvent.click(toggleButton);
    });

    // Click light theme
    waitFor(() => {
      fireEvent.click(screen.getByText('Light'));
    });

    waitFor(() => {
      expect(document.documentElement).toHaveClass('light');
      expect(localStorage.getItem('vite-ui-theme')).toBe('light');
    });
  });
});
