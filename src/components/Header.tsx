import { Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            PsychSense
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#upload" className="transition-colors hover:text-foreground">Upload</a>
          <a href="#questionnaire" className="transition-colors hover:text-foreground">Questionnaire</a>
          <a href="#results" className="transition-colors hover:text-foreground">Results</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
