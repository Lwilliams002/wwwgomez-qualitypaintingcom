import { Link } from "react-router-dom";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ image, title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <div 
      className="service-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={image} alt={title} className="service-card-image" />
      <div className="service-card-content bg-section-light">
        <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
