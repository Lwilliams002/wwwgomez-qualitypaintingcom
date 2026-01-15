import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ColorVisualizer from "@/components/ColorVisualizer";
import { ExternalLink } from "lucide-react";

import heroImage from "@/assets/hero-gallery.jpg";
import commercialImg from "@/assets/service-commercial.jpg";
import residentialImg from "@/assets/service-residential.jpg";
import interiorImg from "@/assets/service-interior.jpg";
import exteriorImg from "@/assets/service-exterior.jpg";

const galleryImages = [
  { src: commercialImg, title: "Commercial Project" },
  { src: residentialImg, title: "Residential Exterior" },
  { src: interiorImg, title: "Interior Painting" },
  { src: exteriorImg, title: "Exterior Painting" },
];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <HeroSection
        backgroundImage={heroImage}
        title="Gallery"
        subtitle="A brush you can Trust!"
      />

      {/* Color Visualizer Section */}
      <ColorVisualizer />

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Recent Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our portfolio of completed projects to see the quality 
              and attention to detail we bring to every job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-8 h-8 mb-2 mx-auto" />
                    <span className="text-lg font-heading font-semibold">{image.title}</span>
                  </div>
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
