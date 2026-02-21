import { motion } from "framer-motion";
import { Activity, AlertTriangle, BarChart3, Brain, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface PredictionResult {
  depressionProbability: number;
  severityLevel: "Minimal" | "Mild" | "Moderate" | "Moderately Severe" | "Severe";
  predictedSubtype: string;
  confidenceScore: number;
  suggestions: { title: string; description: string; icon: string }[];
}

interface ResultsPanelProps {
  result: PredictionResult;
}

const severityConfig: Record<string, { color: string; bg: string }> = {
  Minimal: { color: "text-severity-low", bg: "bg-calm-mint" },
  Mild: { color: "text-severity-low", bg: "bg-calm-mint" },
  Moderate: { color: "text-severity-moderate", bg: "bg-calm-peach" },
  "Moderately Severe": { color: "text-severity-high", bg: "bg-calm-rose" },
  Severe: { color: "text-severity-high", bg: "bg-calm-rose" },
};

const iconMap: Record<string, React.ReactNode> = {
  activity: <Activity className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  chart: <BarChart3 className="h-5 w-5" />,
  alert: <AlertTriangle className="h-5 w-5" />,
};

const ResultsPanel = ({ result }: ResultsPanelProps) => {
  const severity = severityConfig[result.severityLevel] || severityConfig["Moderate"];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.h3 variants={item} className="flex items-center gap-2 text-xl font-bold text-foreground">
        <BarChart3 className="h-6 w-6 text-primary" />
        Analysis Results
      </motion.h3>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Depression Probability */}
        <motion.div variants={item} className="card-calm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Depression Probability</span>
            <span className="text-2xl font-bold text-foreground">{result.depressionProbability}%</span>
          </div>
          <Progress value={result.depressionProbability} className="h-3 rounded-full" />
        </motion.div>

        {/* Confidence */}
        <motion.div variants={item} className="card-calm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
            <span className="text-2xl font-bold text-foreground">{result.confidenceScore}%</span>
          </div>
          <Progress value={result.confidenceScore} className="h-3 rounded-full" />
        </motion.div>

        {/* Severity */}
        <motion.div variants={item} className="card-calm p-5">
          <span className="text-sm font-medium text-muted-foreground">Severity Level</span>
          <div className="mt-2">
            <span className={`inline-block rounded-xl px-4 py-2 text-sm font-semibold ${severity.bg} ${severity.color}`}>
              {result.severityLevel}
            </span>
          </div>
        </motion.div>

        {/* Predicted Subtype */}
        <motion.div variants={item} className="card-calm overflow-hidden">
          <div className="gradient-primary p-5">
            <span className="text-sm font-medium text-primary-foreground/80">Predicted Subtype</span>
            <p className="mt-1 text-xl font-bold text-primary-foreground">{result.predictedSubtype}</p>
          </div>
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div variants={item} className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">
          🌱 Personalized Recovery Suggestions
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {result.suggestions.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="card-calm-hover p-5 space-y-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-calm-lavender text-secondary-foreground">
                {iconMap[s.icon] || iconMap.brain}
              </div>
              <h5 className="font-semibold text-foreground">{s.title}</h5>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
