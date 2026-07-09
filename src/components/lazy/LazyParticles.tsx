import { lazy, Suspense, type ComponentProps } from 'react';

const Particles = lazy(
  () => import('~/components/reactbits/Backgrounds/Particles/Particles')
);

export function LazyParticles(props: ComponentProps<typeof Particles>) {
  return (
    <Suspense fallback={null}>
      <Particles {...props} />
    </Suspense>
  );
}
