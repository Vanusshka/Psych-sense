import { ClipboardList } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface QuestionnaireData {
  elevatedMood: boolean;
  reducedSleep: boolean;
  impulsivity: boolean;
  racingThoughts: boolean;
  durationMonths: number;
  seasonalPattern: string;
  postpartum: string;
  functionalImpairment: number;
}

interface QuestionnaireFormProps {
  data: QuestionnaireData;
  onChange: (data: QuestionnaireData) => void;
}

const QuestionnaireForm = ({ data, onChange }: QuestionnaireFormProps) => {
  const update = (partial: Partial<QuestionnaireData>) =>
    onChange({ ...data, ...partial });

  const maniaItems: { key: keyof Pick<QuestionnaireData, "elevatedMood" | "reducedSleep" | "impulsivity" | "racingThoughts">; label: string; description: string }[] = [
    { key: "elevatedMood", label: "Elevated Mood", description: "Unusually high energy or euphoria" },
    { key: "reducedSleep", label: "Reduced Sleep", description: "Needing less sleep than usual" },
    { key: "impulsivity", label: "Impulsivity", description: "Acting without thinking of consequences" },
    { key: "racingThoughts", label: "Racing Thoughts", description: "Thoughts moving very quickly" },
  ];

  const impairmentLabel =
    data.functionalImpairment <= 25
      ? "Mild"
      : data.functionalImpairment <= 50
      ? "Moderate"
      : data.functionalImpairment <= 75
      ? "Significant"
      : "Severe";

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <ClipboardList className="h-5 w-5 text-primary" />
        Screening Questionnaire
      </h3>

      {/* Mania Screening */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Mania Screening
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {maniaItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 ${
                data[item.key]
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="mr-3">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={data[item.key]}
                onCheckedChange={(checked) => update({ [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Duration of Symptoms
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={120}
            value={data.durationMonths}
            onChange={(e) => update({ durationMonths: Math.max(0, parseInt(e.target.value) || 0) })}
            className="input-calm w-24 text-center"
          />
          <span className="text-sm text-muted-foreground">months</span>
        </div>
      </div>

      {/* Dropdowns row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Seasonal Pattern</label>
          <Select value={data.seasonalPattern} onValueChange={(v) => update({ seasonalPattern: v })}>
            <SelectTrigger className="input-calm">
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No seasonal pattern</SelectItem>
              <SelectItem value="winter">Winter onset</SelectItem>
              <SelectItem value="summer">Summer onset</SelectItem>
              <SelectItem value="spring">Spring onset</SelectItem>
              <SelectItem value="fall">Fall onset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Postpartum Indicator</label>
          <Select value={data.postpartum} onValueChange={(v) => update({ postpartum: v })}>
            <SelectTrigger className="input-calm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">Not applicable</SelectItem>
              <SelectItem value="yes_recent">Yes — within 12 months</SelectItem>
              <SelectItem value="yes_past">Yes — more than 12 months ago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Functional Impairment Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Functional Impairment Level</label>
          <span className="rounded-lg bg-calm-lavender px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {impairmentLabel} ({data.functionalImpairment}%)
          </span>
        </div>
        <Slider
          value={[data.functionalImpairment]}
          onValueChange={([v]) => update({ functionalImpairment: v })}
          max={100}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
