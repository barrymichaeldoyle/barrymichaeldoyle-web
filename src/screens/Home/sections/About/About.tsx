import ProfileCard from '~/components/reactbits/Components/ProfileCard/ProfileCard';

export function AboutSection() {
  return (
    <section className="flex flex-col gap-8 sm:flex-row sm:gap-8">
      <div className="flex flex-2 flex-col gap-2">
        <h2>About</h2>
        <p>
          Hey I&apos;m Barry! As you can pretty much see. This site is still a
          work in progress.
        </p>
        <p>
          But hey, if I&apos;m good at what I do... It&apos;ll look a lot better
          soon!
        </p>
      </div>
      <div className="flex-none sm:flex-1">
        <ProfileCard enableTilt />
      </div>
    </section>
  );
}
