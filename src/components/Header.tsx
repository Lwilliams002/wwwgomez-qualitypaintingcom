import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo-light.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Top info bar */}
      <div className="info-bar">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
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
      <div className="bg-foreground/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Gomez Quality Painting" className="h-12 md:h-16" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Phone number */}
            <div className="hidden lg:flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-right">
                <span className="text-primary text-xs uppercase tracking-wider">Call Us</span>
                <p className="text-white font-semibold">+1 (505) 339-0021</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm uppercase tracking-widest font-medium py-2 transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-white hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+15053390021" className="text-white font-semibold">
                +1 (505) 339-0021
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
