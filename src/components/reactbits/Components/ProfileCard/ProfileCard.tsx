import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SocialButtons } from '~/components/socials/SocialButtons';
import { ErrorBoundary } from '~/components/ui/error-boundary';
import { TITLES } from '~/constants';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  name?: string;
  title?: string;
}

const DEFAULT_BEHIND_GRADIENT =
  'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)';

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
  avatarUrl = '/barry.png',
  iconUrl,
  grainUrl,
  behindGradient,
  innerGradient,
  showBehindGradient = false,
  className = '',
  enableTilt = true,
  name = 'Barry Michael Doyle',
  title = TITLES[0],
}: ProfileCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafMoveId = useRef<number | null>(null);
  const pendingMove = useRef<{ x: number; y: number } | null>(null);
  const cardDimensions = useRef<{ width: number; height: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const hasInitialized = useRef(false);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      // Cache dimensions if not set or if card was resized
      if (
        !cardDimensions.current ||
        cardDimensions.current.width !== card.clientWidth ||
        cardDimensions.current.height !== card.clientHeight
      ) {
        cardDimensions.current = {
          width: card.clientWidth,
          height: card.clientHeight,
        };
      }

      const { width, height } = cardDimensions.current;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      // Batch CSS property updates using direct style object access
      const style = wrap.style;
      style.setProperty('--pointer-x', `${percentX}%`);
      style.setProperty('--pointer-y', `${percentY}%`);
      style.setProperty(
        '--background-x',
        `${adjust(percentX, 0, 100, 35, 65)}%`
      );
      style.setProperty(
        '--background-y',
        `${adjust(percentY, 0, 100, 35, 65)}%`
      );
      style.setProperty(
        '--pointer-from-center',
        `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`
      );
      style.setProperty('--pointer-from-top', `${percentY / 100}`);
      style.setProperty('--pointer-from-left', `${percentX / 100}`);
      style.setProperty('--rotate-x', `${round(-(centerX / 5))}deg`);
      style.setProperty('--rotate-y', `${round(centerY / 4)}deg`);
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store pending move
      pendingMove.current = { x, y };

      // Throttle updates using RAF
      if (rafMoveId.current === null) {
        rafMoveId.current = requestAnimationFrame(() => {
          if (pendingMove.current && card && wrap) {
            animationHandlers.updateCardTransform(
              pendingMove.current.x,
              pendingMove.current.y,
              card,
              wrap
            );
          }
          rafMoveId.current = null;
        });
      }
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add('active');
    card.classList.add('active');
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove('active');
      card.classList.remove('active');
    },
    [animationHandlers]
  );

  useEffect(() => {
    // If tilt is disabled, mark as ready immediately
    if (!enableTilt || !animationHandlers) {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
      return;
    }

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) {
      // If refs aren't ready, try again on next frame
      requestAnimationFrame(() => {
        setIsReady(true);
      });
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    card.addEventListener('pointerenter', handlePointerEnter, { signal });
    card.addEventListener('pointermove', handlePointerMove, { signal });
    card.addEventListener('pointerleave', handlePointerLeave, { signal });

    // Start at center position (same as after hover/leave) to match final state
    const centerX = wrap.clientWidth / 2;
    const centerY = wrap.clientHeight / 2;

    // Set initial position to center immediately without animation
    animationHandlers.updateCardTransform(centerX, centerY, card, wrap);

    // Mark as ready immediately after setting initial position
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      // Use double RAF to ensure all styles are applied and browser has painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Force a reflow to ensure styles are applied
          void wrap.offsetHeight;
          void card.offsetHeight;
          // Ensure card dimensions are cached
          if (!cardDimensions.current) {
            cardDimensions.current = {
              width: card.clientWidth,
              height: card.clientHeight,
            };
          }
          // Update transform one more time to ensure everything is correct
          animationHandlers.updateCardTransform(centerX, centerY, card, wrap);

          // Temporarily add active class to trigger proper rendering state
          // This ensures the card renders in the same state as after hover
          wrap.classList.add('active');
          card.classList.add('active');

          // Force browser to apply all styles by reading computed styles
          void window.getComputedStyle(card).transform;
          void window.getComputedStyle(wrap).getPropertyValue('--pointer-x');

          // Remove active class after a brief moment to match non-hover state
          // but keep the proper transforms applied
          setTimeout(() => {
            wrap.classList.remove('active');
            card.classList.remove('active');
            // Final update to center position to ensure transforms are correct
            animationHandlers.updateCardTransform(centerX, centerY, card, wrap);
            setIsReady(true);
          }, 10);
        });
      });
    } else {
      setIsReady(true);
    }

    return () => {
      abortController.abort();
      animationHandlers.cancelAnimation();
      if (rafMoveId.current !== null) {
        cancelAnimationFrame(rafMoveId.current);
        rafMoveId.current = null;
      }
      pendingMove.current = null;
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () => ({
      // Initialize all CSS custom properties for SSR to prevent FOUC
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '0',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      // Component-specific props
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--behind-gradient': showBehindGradient
        ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
        : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const wrapperClassName = useMemo(
    () =>
      (className
        ? `pc-card-wrapper ${isReady ? 'ready' : 'loading'} ${className}`
        : `pc-card-wrapper ${isReady ? 'ready' : 'loading'}`
      ).trim(),
    [className, isReady]
  );

  return (
    <div
      ref={wrapRef}
      className={wrapperClassName}
      style={cardStyle as Record<string, string>}
    >
      <section
        ref={cardRef}
        className="pc-card"
        style={{
          /* Ensure card always has dimensions during SSR */
          height: '80svh',
          maxHeight: '540px',
          aspectRatio: '0.718',
        }}
      >
        <div className="pc-inside">
          {/* Always render these decorative elements to maintain structure */}
          <div className="pc-shine" />
          <div className="pc-glare" />
          {/* Always render placeholder structure, then replace with real content when ready */}
          <div
            className={`pc-content pc-placeholder ${isReady ? 'hidden' : ''}`}
            aria-hidden={!isReady}
          >
            <div className="pc-avatar-content">
              <div className="avatar-placeholder" />
              <div className="pc-user-info-placeholder" />
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <div className="pc-details-placeholder-title" />
                <div className="pc-details-placeholder-text" />
              </div>
            </div>
          </div>
          {isReady && (
            <>
              <div className="pc-content pc-avatar-content">
                <img
                  className="avatar"
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="pc-user-info mx-auto flex w-fit gap-2">
                  <SocialButtons />
                </div>
              </div>
              <div className="pc-content">
                <div className="pc-details">
                  <h3>{name}</h3>
                  <p>{title}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const ProfileCardComponentWithErrorBoundary = memo(
  (props: ProfileCardProps) => {
    return (
      <ErrorBoundary>
        <ProfileCardComponent {...props} />
      </ErrorBoundary>
    );
  }
);

ProfileCardComponentWithErrorBoundary.displayName = 'ProfileCard';

export const ProfileCard = ProfileCardComponentWithErrorBoundary;
