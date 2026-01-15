import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "SKJtT_k0e11VuH1fm";
const EMAILJS_SERVICE_ID = "service_txrdsd4";
const EMAILJS_TEMPLATE_ID = "template_qlgwp1c";

// Form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FreeQuoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenQuotePopup");
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenQuotePopup", "true");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const emailjs = await import("@emailjs/browser");
      emailjs.init(EMAILJS_PUBLIC_KEY);

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        reply_to: formData.email,
        subject: "Free Quote Request",
        message: formData.message,
      });

      toast.success("Quote request sent! We'll get back to you soon.");
      setIsOpen(false);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send request. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-foreground to-foreground/90 p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-heading font-bold text-white">
              Get Your Free Quote Today!
            </DialogTitle>
            <p className="text-white/70 mt-2">
              Transform your space with professional painting. No obligation, no hassle.
            </p>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="popup-name" className="block text-sm font-medium mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="popup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "border-destructive" : ""}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="popup-email" className="block text-sm font-medium mb-2">
              Your Email *
            </label>
            <input
              type="email"
              id="popup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "border-destructive" : ""}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="popup-message" className="block text-sm font-medium mb-2">
              Tell us about your project *
            </label>
            <textarea
              id="popup-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-textarea ${errors.message ? "border-destructive" : ""}`}
              placeholder="I'm looking to paint my..."
              rows={4}
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold flex-1 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get My Free Quote
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            We respect your privacy. Your information will never be shared.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FreeQuoteModal;
