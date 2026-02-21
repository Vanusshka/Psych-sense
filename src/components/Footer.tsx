import { Brain, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="section-container py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-semibold text-foreground">PsychSense</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-destructive" />
            <span>for mental health awareness</span>
          </div>
          <div className="max-w-lg rounded-xl bg-calm-peach px-4 py-3">
            <p className="text-xs font-medium text-foreground/70">
              ⚠️ Disclaimer: This tool is for research purposes only and does not constitute a medical diagnosis.
              Always consult a qualified healthcare professional for mental health concerns.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 PsychSense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
