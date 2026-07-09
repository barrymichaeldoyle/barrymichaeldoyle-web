import { lazy, Suspense, type ComponentProps } from 'react';

const ProfileCard = lazy(() =>
  import('~/components/reactbits/Components/ProfileCard/ProfileCard').then(
    (m) => ({ default: m.ProfileCard })
  )
);

function ProfileCardFallback() {
  return (
    <div
      className="mx-auto w-full max-w-[calc(540px*0.718)]"
      style={{ height: '80svh', maxHeight: 540, aspectRatio: '0.718' }}
      aria-hidden="true"
    />
  );
}

export function LazyProfileCard(props: ComponentProps<typeof ProfileCard>) {
  return (
    <Suspense fallback={<ProfileCardFallback />}>
      <ProfileCard {...props} />
    </Suspense>
  );
}
