import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentProps } from 'react';

import { cn } from '~/lib/utils';

const cardVariants = cva(
  'text-card-foreground border-border/40 relative overflow-hidden border-2 border-primary bg-background-secondary p-4 transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: ['rounded-lg'],
        feature: ['rounded-l-sm rounded-r-2xl', 'border-l-12'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
