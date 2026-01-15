import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ColorVisualizer from "@/components/ColorVisualizer";
import { ArrowUpRight, Sparkles } from "lucide-react";

import heroImage from "@/assets/hero-gallery.jpg";
import commercialImg from "@/assets/service-commercial.jpg";
import residentialImg from "@/assets/service-residential.jpg";
import interiorImg from "@/assets/service-interior.jpg";
import exteriorImg from "@/assets/service-exterior.jpg";

const galleryImages = [
  { src: commercialImg, title: "Commercial Project", category: "commercial", description: "Modern office space transformation" },
  { src: residentialImg, title: "Residential Exterior", category: "residential", description: "Complete home exterior refresh" },
  { src: interiorImg, title: "Interior Painting", category: "interior", description: "Elegant living room makeover" },
  { src: exteriorImg, title: "Exterior Painting", category: "exterior", description: "Weather-resistant finish" },
  { src: commercialImg, title: "Retail Space", category: "commercial", description: "Boutique store redesign" },
  { src: residentialImg, title: "Family Home", category: "residential", description: "Warm & inviting colors" },
  { src: interiorImg, title: "Kitchen Refresh", category: "interior", description: "Cabinet & wall refinishing" },
  { src: exteriorImg, title: "Stucco Restoration", category: "exterior", description: "Southwest style perfection" },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection
        backgroundImage={heroImage}
        title="Our Projects"
        subtitle="Craftsmanship you can see. Quality you can trust."
      />

      {/* Color Visualizer Section */}
      <ColorVisualizer />

      {/* Gallery Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
              Recent <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Browse through our portfolio of completed projects to see the quality 
              and attention to detail we bring to every job.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 
                  ${activeCategory === category.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105" 
                    : "bg-card border border-border text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-primary/30"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-card cursor-pointer
                  transition-all duration-500 ease-out
                  ${index % 5 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                  ${index % 3 === 0 ? 'row-span-1' : ''}
                `}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.6s ease-out forwards',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${index % 4 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out
                      ${hoveredIndex === index ? 'scale-110 brightness-75' : 'scale-100 brightness-100'}
                    `}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                    transition-opacity duration-500
                    ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                  `} />

                  {/* Content Overlay */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-6
                    transition-all duration-500 ease-out
                    ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}>
                    <span className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl font-heading font-bold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {image.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group/link">
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                    flex items-center justify-center transition-all duration-500
                    ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
                  `}>
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-foreground to-foreground/90">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "28", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "50+", label: "5-Star Reviews" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.6s ease-out forwards',
                }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
