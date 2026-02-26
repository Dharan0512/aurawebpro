import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { branding } from "@/config/branding";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, url: branding.social.facebook, label: "Facebook" },
    { icon: Twitter, url: branding.social.twitter, label: "Twitter" },
    { icon: Instagram, url: branding.social.instagram, label: "Instagram" },
    { icon: Linkedin, url: branding.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold">
                {branding.businessName.charAt(0)}
              </div>
              <span className="font-bold text-lg">{branding.businessName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {branding.tagline}
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href={`mailto:${branding.email}`} className="flex items-center space-x-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                <span>{branding.email}</span>
              </a>
              <a href={`tel:${branding.phone}`} className="flex items-center space-x-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                <span>{branding.phone}</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{branding.address}</span>
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center group"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {branding.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
