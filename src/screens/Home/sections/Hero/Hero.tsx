import { DevElement } from '~/components/DevElement/DevElement';
import RotatingText from '~/components/reactbits/TextAnimations/RotatingText/RotatingText';

export function HeroSection() {
  return (
    <section className="text-center py-10 w-full">
      <div className="flex flex-col max-w-4xl mx-auto relative z-10 gap-5 text-end px-2 w-fit">
        <h1>Barry Michael Doyle</h1>
        <h2 className="flex flex-1 text-end justify-end gap-2">
          <RotatingText
            texts={['Software', 'Frontend', 'Design', 'Staff']}
            staggerFrom="random"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            staggerDuration={0.025}
            rotationInterval={2500}
          />{' '}
          Engineer
        </h2>
        <div className="flex justify-end w-full">
          <DevElement className="color-white max-w-full w-129" />
        </div>
      </div>
    </section>
  );
}
