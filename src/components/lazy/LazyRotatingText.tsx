import { lazy, Suspense, type ComponentProps } from 'react';
import { TITLES } from '~/constants';

const RotatingText = lazy(
  () =>
    import('~/components/reactbits/TextAnimations/RotatingText/RotatingText')
);

function RotatingTextFallback({ texts }: { texts: string[] }) {
  return <span>{texts[0] ?? TITLES[0].replaceAll(' Engineer', '')}</span>;
}

export function LazyRotatingText(props: ComponentProps<typeof RotatingText>) {
  return (
    <Suspense fallback={<RotatingTextFallback texts={props.texts} />}>
      <RotatingText {...props} />
    </Suspense>
  );
}
