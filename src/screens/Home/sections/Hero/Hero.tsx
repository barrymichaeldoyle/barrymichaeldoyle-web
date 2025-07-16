import { DevElement } from '~/components/DevElement/DevElement';

export function HeroSection() {
  return (
    <section className="text-center py-10 w-full">
      <div className="flex flex-col max-w-4xl mx-auto relative z-10 gap-1 text-end px-2 w-full">
        <h1>Barry Michael Doyle</h1>
        <h2 className="">Software Engineer</h2>
        <div className="flex justify-end w-full">
          <DevElement className="color-white max-w-full w-129" />
        </div>
      </div>
    </section>
  );
}
