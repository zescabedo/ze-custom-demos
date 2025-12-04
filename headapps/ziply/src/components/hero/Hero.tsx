import { useState, useEffect } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { cva } from 'class-variance-authority';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { Button } from '@/components/ui/button';
import { Default as MediaSection } from '@/components/media-section/MediaSection.dev';
import { HeroProps } from './hero.props';

// Define heroVariants using class-variance-authority for styling
export const heroVariants = cva('hero @container py-24 relative w-full overflow-hidden', {
  variants: {
    colorScheme: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-primary',
      tertiary: 'bg-tertiary text-primary',
      dark: 'bg-dark text-primary',
      light: 'bg-light text-primary',
    },
  },
  defaultVariants: {
    colorScheme: 'light',
  },
});

export const Default: React.FC<HeroProps> = ({ fields, params }) => {
  const {
    titleRequired,
    descriptionOptional,
    linkOptional,
    heroVideoOptional1,
    heroImageOptional1,
    heroVideoOptional2,
    heroImageOptional2,
    heroVideoOptional3,
    heroImageOptional3,
    heroVideoOptional4,
    heroImageOptional4,
  } = fields || {};

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const { colorScheme } = params;
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPlaying(!mediaQuery.matches);
  }, []);

  if (fields) {
    return (
      <section className={cn(heroVariants({ colorScheme }), [params?.styles && params.styles])}>
        <div className="grid gap-20">
          {/* Hero content */}
          <div className="mx-auto w-full max-w-screen-xl px-4 xl:px-8">
            <AnimatedSection
              direction="up"
              className="@lg:flex-row @lg:items-center @lg:gap-10 flex flex-col items-stretch gap-3"
              isPageEditing={isPageEditing}
            >
              {(titleRequired?.value || isPageEditing) && (
                <Text
                  tag="h1"
                  field={titleRequired}
                  className="font-heading @lg:text-8xl @lg:leading-[90px] basis-1/2 text-5xl font-normal leading-[60px]"
                />
              )}
              <div className="@lg:gap-10 flex basis-1/2 flex-col gap-8 ">
                {(descriptionOptional?.value || isPageEditing) && (
                  <Text
                    tag="p"
                    className={cn(
                      'font-body line-height-[26px] text-medium font-base @md:text-xl text-lg',
                      {
                        'text-primary-foreground': colorScheme === 'primary',
                        'text-secondary-foreground': colorScheme !== 'primary',
                      }
                    )}
                    field={descriptionOptional}
                  />
                )}
                {linkOptional && (
                  <div>
                    <EditableButton
                      buttonLink={linkOptional}
                      className={
                        colorScheme === 'primary' ? 'text-primary bg-white hover:bg-gray-100' : ''
                      }
                      isPageEditing={isPageEditing}
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Hero media strip */}
          <div className="relative flex items-center justify-center overflow-x-hidden">
            <div className="@lg:gap-8 @lg:min-w-[120%] mx-auto flex min-w-[110%]  items-start gap-4 px-4">
              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional1?.value?.href}
                  image={heroImageOptional1}
                  className="aspect-280/356 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>

              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional2?.value?.href}
                  image={heroImageOptional2}
                  className="aspect-280/196 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>

              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional3?.value?.href}
                  image={heroImageOptional3}
                  className="aspect-280/356 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>

              <div className="shrink-0 grow-0 basis-1/4">
                <MediaSection
                  video={heroVideoOptional4?.value?.href}
                  image={heroImageOptional4}
                  className="aspect-280/356 relative"
                  pause={!isPlaying}
                  reducedMotion={isPageEditing || prefersReducedMotion}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Play/Pause button */}
        {!prefersReducedMotion && (
          <Button
            variant="link"
            size="icon"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="absolute bottom-2 right-2"
            aria-label={isPlaying ? 'Pause Ambient Video' : 'Play Ambient Video'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        )}
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
};

// ============================================================================
// Rendering Variant ImageBackground
// ============================================================================

export const ImageBackground: React.FC<HeroProps> = ({ fields, params }) => {
  const {
    titleRequired,
    descriptionOptional,
    linkOptional,
    heroVideoOptional1,
    heroImageOptional1,
  } = fields || {};

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setIsPlaying(!mediaQuery.matches);
  }, []);

  if (!fields) {
    return <NoDataFallback componentName="Hero" />;
  }

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background',
        // make sure the hero has enough height on all breakpoints
        'min-h-[26rem] sm:min-h-[30rem] lg:min-h-[34rem]',
        params?.styles && params.styles
      )}
    >
      {/* Full-width responsive background media */}
      <div className="absolute inset-0">
        <MediaSection
          video={heroVideoOptional1?.value?.href}
          image={heroImageOptional1}
          className="h-full w-full object-cover object-center lg:object-right"
          pause={!isPlaying}
          reducedMotion={isPageEditing || prefersReducedMotion}
        />
      </div>

      {/* White gradient overlay starting at about 40 percent from the left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 70%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Content and hardcoded address checker, centered on larger screens */}
      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-8 px-4 py-12 sm:py-16 lg:py-20">
          {/* Text content */}
          <div className="max-w-xl text-left text-foreground">
            {(titleRequired?.value || isPageEditing) && (
              <Text
                tag="h1"
                field={titleRequired}
                className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              />
            )}

            {(descriptionOptional?.value || isPageEditing) && (
              <Text
                tag="p"
                field={descriptionOptional}
                className="mt-4 text-base leading-relaxed sm:text-lg lg:text-xl"
              />
            )}

            {linkOptional && (
              <div className="pt-4">
                <EditableButton
                  buttonLink={linkOptional}
                  isPageEditing={isPageEditing}
                  className="inline-flex items-center bg-transparent border-none px-0 py-0 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] shadow-none hover:bg-transparent hover:text-[#0151a5]"
                />
              </div>
            )}
          </div>

          {/* Hardcoded address checker card */}
          <div className="w-full">
            <div className="mx-auto w-full rounded-[1.5rem] bg-white px-4 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:px-6 sm:py-6 lg:px-10 lg:py-7">
              <p className="mb-4 text-lg font-medium text-foreground sm:text-xl">
                Check availability in your area
              </p>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
                {/* Inputs container */}
                <div className="flex-1 grid gap-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end">
                  {/* Address */}
                  <label className="flex flex-col text-sm text-muted-foreground">
                    <span className="mb-1">Your address</span>
                    <input
                      type="text"
                      className="border-b border-[var(--color-border)] bg-transparent py-1 text-base text-foreground outline-none focus:border-[var(--color-ring)]"
                    />
                  </label>

                  {/* Unit */}
                  <label className="flex flex-col text-sm text-muted-foreground">
                    <span className="mb-1">Unit #</span>
                    <input
                      type="text"
                      className="border-b border-[var(--color-border)] bg-transparent py-1 text-base text-foreground outline-none focus:border-[var(--color-ring)]"
                    />
                  </label>

                  {/* Zip */}
                  <label className="flex flex-col text-sm text-muted-foreground">
                    <span className="mb-1">Zip Code</span>
                    <input
                      type="text"
                      className="border-b border-[var(--color-border)] bg-transparent py-1 text-base text-foreground outline-none focus:border-[var(--color-ring)]"
                    />
                  </label>

                  {/* Residential select */}
                  <label className="flex flex-col text-sm text-muted-foreground">
                    <span className="mb-1">Residential</span>
                    <div className="flex items-center border-b border-[var(--color-border)] pb-1">
                      <select
                        className="w-full bg-transparent text-base text-foreground outline-none"
                        defaultValue="Residential"
                      >
                        <option>Residential</option>
                        <option>Business</option>
                      </select>
                    </div>
                  </label>
                </div>

                {/* Button */}
                <div className="flex w-full justify-end lg:w-auto">
                  <Button
                    type="button"
                    className="mt-1 w-full rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold tracking-wide text-white hover:bg-[#0151a5] lg:mt-0 lg:w-auto"
                  >
                    CHECK ADDRESS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional play and pause if using video */}
      {!prefersReducedMotion && heroVideoOptional1?.value?.href && (
        <Button
          variant="link"
          size="icon"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="absolute bottom-4 right-4 text-white"
          aria-label={isPlaying ? 'Pause Ambient Video' : 'Play Ambient Video'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      )}
    </section>
  );
};
