import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Award, Shield, MessageSquare } from "lucide-react";

import heroImage from "@/assets/hero-home.jpg";
import commercialImg from "@/assets/service-commercial.jpg";
import residentialImg from "@/assets/service-residential.jpg";
import interiorImg from "@/assets/service-interior.jpg";
import exteriorImg from "@/assets/service-exterior.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section min-h-screen">
        <img
          src={heroImage}
          alt="Professional painting services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay" />
        <div className="hero-content container mx-auto px-4 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Commercial and Residential Painting
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                We're your locally owned painting specialists, delivering professional 
                interior and exterior finishes for both residential homes and commercial 
                properties. Call us today to schedule a comprehensive service for your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/gallery" className="btn-gold">
                  Preview Colors
                </Link>
                <Link to="/contact" className="btn-gold-outline text-white border-white hover:bg-white hover:text-foreground">
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            <ServiceCard
              image={commercialImg}
              title="Commercial Painting"
              description="We specialize in high-performance painting solutions for local commercial buildings, ensuring your storefronts and offices make a lasting, professional impression."
              delay={0}
            />
            <ServiceCard
              image={residentialImg}
              title="Residential Painting"
              description="Whether refreshing a single room or revitalizing your entire home, our residential painting delivers flawless finishes and personalized color schemes that reflect your style."
              delay={100}
            />
            <ServiceCard
              image={interiorImg}
              title="Interior Painting"
              description="Through diligent surface preparation and precision application, we achieve flawless interior walls, trim, and ceilings, creating a polished look that stands up to everyday wear."
              delay={200}
            />
            <ServiceCard
              image={exteriorImg}
              title="Exterior Painting"
              description="We apply premium primers and weather-resistant coatings to protect your property's façade, delivering a clean, even finish that endures rain, sun, and temperature changes."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* CTA Section with Counter */}
      <section className="relative py-24">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="counter-box">
              <div className="counter-number">28</div>
              <div className="counter-label">Years of Experience</div>
            </div>
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Are you looking for professional painting services?
              </h2>
            </div>
            <div className="text-white">
              <p className="mb-6 text-white/80 leading-relaxed">
                We're your neighborhood experts in interior and exterior projects 
                for both homes and businesses. Our meticulous prep work and premium 
                coatings ensure flawless, enduring finishes that stand up to daily wear.
              </p>
              <Link to="/contact" className="btn-gold">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-box animate-fade-in" style={{ animationDelay: "0ms" }}>
              <div className="feature-icon">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-2">Professional Painters</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our certified team brings years of expertise to every job, using precise 
                  techniques and high-quality materials to deliver flawless, long-lasting finishes.
                </p>
              </div>
            </div>

            <div className="feature-box animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="feature-icon">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-2">Satisfaction Guarantee</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your happiness is our top priority—if you're not completely satisfied with 
                  our work, we'll return and make it right. We back every project with a 
                  customer satisfaction guarantee.
                </p>
              </div>
            </div>

            <div className="feature-box animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="feature-icon">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-2">Free Consultation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Book your no-obligation consultation today—one of our specialists will 
                  assess your project, offer tailored color and finish advice, and provide 
                  a transparent, detailed quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
