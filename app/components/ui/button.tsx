import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Common styles that are reused across variants
export const commonButtonHoverEffects =
  'hover:scale-[1.02] active:scale-[0.98] origin-center will-change-transform';
export const commonButtonGlowEffects =
  'shadow-[var(--button-glow)] hover:shadow-[var(--button-glow-hover)] hover:border-[var(--button-border-glow)]';

const buttonVariants = cva(
  cn(
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md text-sm font-medium',
    'border transform-gpu cursor-pointer',

    // Transitions
    'transition-all duration-300',

    // States
    'disabled:pointer-events-none disabled:opacity-50',
    'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

    // SVG handling
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    'shrink-0'
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 border-transparent',
          commonButtonGlowEffects,
          commonButtonHoverEffects
        ),
        destructive: cn(
          'bg-destructive text-white dark:bg-destructive/60',
          'hover:bg-destructive/90 border-transparent hover:border-destructive/30',
          'shadow-xs hover:shadow-[0_0_15px_rgba(239,68,68,0.35),0_0_30px_rgba(239,68,68,0.25)]',
          'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
          commonButtonHoverEffects
        ),
        outline: cn(
          'border-border bg-background dark:bg-input/30 dark:border-input',
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50',
          commonButtonGlowEffects,
          commonButtonHoverEffects
        ),
        secondary: cn(
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80 border-transparent',
          'hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
          commonButtonHoverEffects
        ),
        ghost: cn(
          'border-transparent',
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          'hover:shadow-[var(--button-glow-hover)]',
          commonButtonHoverEffects
        ),
        link: 'text-primary underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
