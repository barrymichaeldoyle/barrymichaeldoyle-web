import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  cn(
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'rounded-md text-sm font-semibold whitespace-nowrap',
    'transform-gpu cursor-pointer border',

    // Transitions
    'transition-all duration-300',

    // SVG handling
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    'shrink-0'
  ),
  {
    variants: {
      variant: {
        default: cn(
          'border-transparent bg-primary text-background hover:bg-primary/90'
        ),
        destructive: cn(
          'bg-destructive hover:bg-destructive/90 hover:border-destructive/30 border-transparent text-white shadow-xs hover:shadow-[0_0_15px_rgba(239,68,68,0.35),0_0_30px_rgba(239,68,68,0.25)]'
        ),
        outline: cn(
          'border-border hover:bg-input/50 accent hover:text-accent-foreground bg-background'
        ),
        secondary: cn(
          'bg-card text-secondary-foreground border-muted-foreground',
          'hover:bg-secondary/80 focus:border-2'
        ),
        ghost: cn(
          'border-transparent shadow-none',
          'hover:bg-input/50 accent hover:text-accent-foreground'
        ),
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 [&_svg:not([class*="size-"])]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
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
