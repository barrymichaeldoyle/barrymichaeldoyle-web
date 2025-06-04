import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.625rem] leading-normal font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none cursor-default select-none transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-muted/40 text-muted-foreground dark:bg-muted/30 dark:text-muted-foreground/90 dark:border dark:border-border/30',
        secondary:
          'bg-secondary/30 text-secondary-foreground/90 dark:bg-secondary/20 dark:text-secondary-foreground/90 dark:border dark:border-border/30',
        destructive:
          'bg-destructive/15 text-destructive-foreground/90 dark:bg-destructive/20 dark:text-destructive-foreground/90 dark:border dark:border-destructive/30',
        outline:
          'border border-border/50 dark:border-border/30 text-muted-foreground/90 dark:text-muted-foreground/80',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
