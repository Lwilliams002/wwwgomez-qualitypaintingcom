interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const HeroSection = ({ backgroundImage, title, subtitle, children }: HeroSectionProps) => {
  return (
    <section className="hero-section min-h-[50vh] md:min-h-[60vh]">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay" />
      <div className="hero-content container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 italic">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
