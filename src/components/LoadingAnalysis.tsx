import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const LoadingAnalysis = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="gradient-primary flex h-16 w-16 items-center justify-center rounded-2xl"
      >
        <Brain className="h-8 w-8 text-primary-foreground" />
      </motion.div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Analyzing your input...</h3>
        <p className="text-sm text-muted-foreground">Our AI model is processing your data</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnalysis;
