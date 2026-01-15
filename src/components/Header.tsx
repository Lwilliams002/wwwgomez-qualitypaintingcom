import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo-gomez.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-foreground/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      {/* Top info bar */}
      <div 
        className={`info-bar overflow-hidden transition-all duration-500 ${
          isScrolled ? "max-h-0 py-0" : "max-h-12 py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div 
            className={`flex justify-between items-center transform transition-all duration-500 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            <div className="flex gap-6 text-sm">
              <span>
                Working Hours Monday - Friday{" "}
                <span className="text-primary font-semibold">08:00-16:00</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <Link 
              to="/" 
              className={`flex-shrink-0 transform transition-all duration-700 delay-100 ${
                isVisible 
                  ? "translate-x-0 opacity-100" 
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <img 
                src={logo} 
                alt="Gomez Quality Painting" 
                className={`transition-all duration-300 ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-16"}`} 
              />
            </Link>

            {/* Desktop Navigation with staggered animation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest font-medium transition-all duration-300 relative group
                    transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
                    ${isActive(link.path) ? "text-primary" : "text-white hover:text-primary"}
                  `}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 
                      ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              ))}
            </nav>

            {/* Phone number with animation */}
            <div 
              className={`hidden lg:flex items-center gap-3 transform transition-all duration-700 delay-500 ${
                isVisible 
                  ? "translate-x-0 opacity-100" 
                  : "translate-x-8 opacity-0"
              }`}
            >
              <div className="relative">
                <Phone className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div className="text-right">
                <span className="text-primary text-xs uppercase tracking-wider">Call Us</span>
                <p className="text-white font-semibold hover:text-primary transition-colors">
                  <a href="tel:+15053390021">+1 (505) 339-0021</a>
                </p>
              </div>
            </div>

            {/* Mobile menu button with animation */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden text-white p-2 transform transition-all duration-500 delay-300 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`w-6 h-6 absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`} 
                />
                <X 
                  className={`w-6 h-6 absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with slide animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-foreground/95 backdrop-blur-md border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm uppercase tracking-widest font-medium py-3 px-4 rounded-lg
                  transition-all duration-300 transform
                  ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
                  ${isActive(link.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-white hover:text-primary hover:bg-white/5"
                  }
                `}
                style={{ transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
            <div 
              className={`flex items-center gap-3 pt-4 mt-2 border-t border-white/10 transform transition-all duration-300 ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? "225ms" : "0ms" }}
            >
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+15053390021" className="text-white font-semibold hover:text-primary transition-colors">
                +1 (505) 339-0021
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
