import { Link } from "react-router-dom";
import logo from "@/assets/logo-gomez.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Gomez Quality Painting" className="h-16 mb-6" />
            <p className="text-white/70 leading-relaxed">
              We are a locally owned painting company based in New Mexico, 
              specializing in interior and exterior painting for residential 
              and commercial properties. Our skilled team uses premium paints 
              and meticulous techniques to deliver a flawless, long-lasting 
              finish that enhances and protects every space.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-heading">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/gallery" className="footer-link">Commercial Painting</Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-link">Residential Painting</Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-link">Interior Painting</Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-link">Exterior Painting</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <div className="space-y-3 text-white/70">
              <p>
                <strong className="text-white">Web:</strong>{" "}
                <a href="https://www.gomez-qualitypainting.com" className="hover:text-primary transition-colors">
                  www.gomez-qualitypainting.com
                </a>
              </p>
              <p>
                <strong className="text-white">Phone:</strong>{" "}
                <a href="tel:+15053390021" className="hover:text-primary transition-colors">
                  +1 (505) 339-0021
                </a>
              </p>
              <p>Albuquerque, New Mexico</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Gomez Quality Painting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
