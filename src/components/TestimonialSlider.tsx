import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  image: string;
  name: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Homeowner, Albuquerque",
    text: "Gomez Quality Painting gave our home's exterior a stunning new look. Their attention to detail and friendly team made the process stress-free!",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Business Owner, Santa Fe",
    text: "Professional, punctual, and precise. They refreshed our office interior with high-quality finishes — clients can't stop complimenting our space!",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Property Manager, Rio Rancho",
    text: "We trust Gomez Quality Painting for every rental property. Their team delivers flawless results on time and within budget, every single time.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-3xl mx-auto py-16">
      <div className="testimonial-card relative">
        {/* Rating badge */}
        <div className="absolute top-4 right-4 testimonial-rating">
          {current.rating} <Star className="w-3 h-3 ml-0.5 fill-primary text-primary inline" />
        </div>

        {/* Content */}
        <img
          src={current.image}
          alt={current.name}
          className="testimonial-avatar"
        />
        <h3 className="text-xl font-heading font-semibold mb-4">{current.name}</h3>
        <p className="text-muted-foreground leading-relaxed">{current.text}</p>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary-bronze transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary-bronze transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-primary transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-white"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
