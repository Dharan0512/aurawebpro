import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { branding } from "@/config/branding";
import { Target, Heart, Users, Award } from "lucide-react";
import SEO from "@/components/SEO";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're committed to delivering exceptional results that exceed expectations.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your success is our success. We prioritize your needs in everything we do.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our talented professionals bring years of experience and passion.",
    },
    {
      icon: Award,
      title: "Quality Focus",
      description: "We never compromise on quality, ensuring excellence in every project.",
    },
  ];

  return (
    <>
    {/* <SEO
        title="About Us"
        description={branding.about.mission}
      /> */}
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our story, mission, and the values that drive us forward
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {branding.about.mission}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {branding?.about?.story}
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-2 text-lg text-muted-foreground">
              <p>
                <a href={`mailto:${branding.email}`} className="hover:text-primary transition-colors">
                  {branding.email}
                </a>
              </p>
              <p>
                <a href={`tel:${branding.phone}`} className="hover:text-primary transition-colors">
                  {branding.phone}
                </a>
              </p>
              <p className="text-base">{branding.address}</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}
