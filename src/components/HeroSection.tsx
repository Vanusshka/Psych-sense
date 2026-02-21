import { motion } from "framer-motion";
import { ArrowDown, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 gradient-hero" />
      </div>
      <div className="section-container relative py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-calm-lavender px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Shield className="h-4 w-4" />
            AI-Powered Mental Health Screening
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Mental Health,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Understood
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Upload a voice recording or describe how you're feeling. Our multimodal AI analyzes patterns to provide insights and personalized recovery suggestions.
          </p>
          <motion.a
            href="#upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-analyze inline-flex items-center gap-2"
          >
            Get Started
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
