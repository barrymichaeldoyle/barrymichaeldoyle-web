import { lazy, Suspense, type ComponentProps } from 'react';

const Aurora = lazy(() =>
  import('~/components/reactbits/Backgrounds/Aurora/Aurora').then((m) => ({
    default: m.Aurora,
  }))
);

export function LazyAurora(props: ComponentProps<typeof Aurora>) {
  return (
    <Suspense fallback={<div className="h-full w-full bg-background" />}>
      <Aurora {...props} />
    </Suspense>
  );
}
