import { render, screen, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AnimatedTitle } from '../AnimatedTitle';

import { TITLES } from '@/constants';

describe('AnimatedTitle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  describe('Initial Render', () => {
    it('renders the first title from TITLES constant', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent(TITLES[0]);
    });

    it('starts with visible state', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toHaveClass('opacity-100');
      expect(titleElement).not.toHaveClass('opacity-0');
    });

    it('applies correct responsive typography classes', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toHaveClass(
        'text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });
  });

  describe('Animation Behavior', () => {
    it('cycles through all actual TITLES in sequence', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Verify it starts with the first title
      expect(titleElement).toHaveTextContent(TITLES[0]);

      // Test cycling through each title in the real TITLES array
      for (let i = 1; i < TITLES.length; i++) {
        // Complete a full animation cycle (3000ms + 300ms)
        act(() => {
          vi.advanceTimersByTime(3300);
        });

        // Should now show the next title
        expect(titleElement).toHaveTextContent(TITLES[i]);
        expect(titleElement).toHaveClass('opacity-100');
      }
    });

    it('cycles back to first title after reaching the end', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Cycle through all titles once
      for (let i = 0; i < TITLES.length; i++) {
        act(() => {
          vi.advanceTimersByTime(3300); // 3000ms + 300ms
        });
      }

      // Should be back to the first title
      expect(titleElement).toHaveTextContent(TITLES[0]);
    });

    it('maintains correct fade timing sequence', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });
      const initialTitle = TITLES[0];
      const nextTitle = TITLES[1];

      // Initially visible with first title
      expect(titleElement).toHaveClass('opacity-100');
      expect(titleElement).toHaveTextContent(initialTitle);

      // After 3 seconds: faded out, still showing first title
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(titleElement).toHaveClass('opacity-0');
      expect(titleElement).toHaveTextContent(initialTitle);

      // After fade duration: faded in with new title
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(titleElement).toHaveClass('opacity-100');
      expect(titleElement).toHaveTextContent(nextTitle);
    });
  });

  describe('Timer Management', () => {
    it('cleans up interval when component unmounts', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

      const { unmount } = render(<AnimatedTitle />);

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    it('continues cycling consistently over time', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Test a few cycles to ensure consistency
      const cyclesToTest = 2;

      for (let cycle = 0; cycle < cyclesToTest; cycle++) {
        for (let titleIndex = 0; titleIndex < TITLES.length; titleIndex++) {
          const expectedTitle = TITLES[titleIndex];

          if (cycle === 0 && titleIndex === 0) {
            // Skip first check since it's already rendered
            expect(titleElement).toHaveTextContent(expectedTitle);
            continue;
          }

          act(() => {
            vi.advanceTimersByTime(3300);
          });

          expect(titleElement).toHaveTextContent(expectedTitle);
        }
      }
    });
  });

  describe('Real World Scenarios', () => {
    it('works with actual TITLES array length', () => {
      // This test will fail if TITLES becomes empty or undefined
      expect(TITLES.length).toBeGreaterThan(0);

      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Should show a real title, not undefined or empty
      expect(titleElement.textContent).toBeTruthy();
      expect(TITLES).toContain(titleElement.textContent);
    });

    it('handles the actual titles content correctly', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Test first few titles to verify they render correctly
      TITLES.slice(0, Math.min(3, TITLES.length)).forEach(
        (expectedTitle, index) => {
          if (index > 0) {
            act(() => {
              vi.advanceTimersByTime(3300);
            });
          }

          expect(titleElement).toHaveTextContent(expectedTitle);
          // Verify the title is not empty or just whitespace
          expect(expectedTitle.trim().length).toBeGreaterThan(0);
        }
      );
    });
  });

  describe('Accessibility & Semantics', () => {
    it('maintains proper heading structure', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement.tagName).toBe('H2');
    });

    it('preserves content accessibility during transitions', () => {
      render(<AnimatedTitle />);

      const titleElement = screen.getByRole('heading', { level: 2 });

      // Even during fade out, content should remain accessible
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Text content should still be there, just visually faded
      expect(titleElement.textContent).toBeTruthy();
      expect(titleElement).toBeInTheDocument();
    });
  });
});
