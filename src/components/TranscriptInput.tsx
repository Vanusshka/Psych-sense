import { FileText } from "lucide-react";

interface TranscriptInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TranscriptInput = ({ value, onChange }: TranscriptInputProps) => {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <FileText className="h-5 w-5 text-primary" />
        Transcript / How Are You Feeling?
      </h3>
      <p className="text-sm text-muted-foreground">
        Type or paste a transcript of how you've been feeling recently
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I've been feeling really tired lately and can't seem to find motivation for things I used to enjoy..."
        className="input-calm min-h-[160px] w-full resize-y"
        rows={6}
      />
      <p className="text-xs text-muted-foreground text-right">{value.length} characters</p>
    </div>
  );
};

export default TranscriptInput;
