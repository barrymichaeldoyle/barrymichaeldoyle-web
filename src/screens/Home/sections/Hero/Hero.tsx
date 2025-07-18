import { DevElement } from '~/components/DevElement/DevElement';
import RotatingText from '~/components/reactbits/TextAnimations/RotatingText/RotatingText';
import { TITLES } from '~/constants';

export function HeroSection() {
  return (
    <section className="w-full py-10 pt-[30vh] text-center">
      <div className="relative z-10 mx-auto flex w-fit max-w-4xl flex-col gap-5 px-4 text-end">
        <h1>Barry Michael Doyle</h1>
        <h2 className="flex flex-1 justify-end gap-2 text-end">
          <RotatingText
            texts={TITLES.map((title) => title.replaceAll(' Engineer', ''))}
            staggerFrom="random"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            staggerDuration={0.025}
            rotationInterval={2500}
          />{' '}
          Engineer
        </h2>
        <div className="flex w-full justify-end">
          <DevElement className="color-white w-129 max-w-full" />
        </div>
      </div>
    </section>
  );
}
