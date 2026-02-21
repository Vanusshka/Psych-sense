import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AudioUploader from "@/components/AudioUploader";
import TranscriptInput from "@/components/TranscriptInput";
import QuestionnaireForm, { type QuestionnaireData } from "@/components/QuestionnaireForm";
import ResultsPanel, { type PredictionResult } from "@/components/ResultsPanel";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import Footer from "@/components/Footer";

const mockResult: PredictionResult = {
  depressionProbability: 62,
  severityLevel: "Moderate",
  predictedSubtype: "Persistent Depressive Disorder",
  confidenceScore: 84,
  suggestions: [
    {
      title: "Mindfulness Practice",
      description: "Start with 10 minutes of guided meditation daily. Apps like Headspace or Calm can help build a consistent practice.",
      icon: "brain",
    },
    {
      title: "Physical Activity",
      description: "Aim for 30 minutes of moderate exercise 3-4 times per week. Even a daily walk can significantly improve mood.",
      icon: "activity",
    },
    {
      title: "Sleep Hygiene",
      description: "Maintain a consistent sleep schedule. Avoid screens 1 hour before bed and keep your room cool and dark.",
      icon: "shield",
    },
    {
      title: "Social Connection",
      description: "Reach out to a trusted friend or family member. Even brief social interactions can help reduce feelings of isolation.",
      icon: "chart",
    },
    {
      title: "Professional Support",
      description: "Consider speaking with a licensed therapist or counselor. Cognitive Behavioral Therapy (CBT) has strong evidence for depression.",
      icon: "alert",
    },
    {
      title: "Journaling",
      description: "Write down your thoughts and feelings for 10 minutes each evening. This can help identify patterns and process emotions.",
      icon: "brain",
    },
  ],
};

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireData>({
    elevatedMood: false,
    reducedSleep: false,
    impulsivity: false,
    racingThoughts: false,
    durationMonths: 0,
    seasonalPattern: "none",
    postpartum: "no",
    functionalImpairment: 30,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze = transcript.trim().length > 0 || audioFile !== null;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      transcript,
      audio_metadata: audioFile
        ? { name: audioFile.name, size: audioFile.size, type: audioFile.type }
        : null,
      questionnaire,
    };

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Backend returned an error");

      const data = await response.json();
      setResult(data);
    } catch {
      // Use mock data for demo purposes
      await new Promise((r) => setTimeout(r, 2500));
      setResult(mockResult);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main className="section-container space-y-10 py-12">
        {/* Input Section */}
        <section id="upload" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="card-calm p-6 sm:p-8">
              <AudioUploader onFileChange={setAudioFile} />
            </div>
            <div className="card-calm p-6 sm:p-8">
              <TranscriptInput value={transcript} onChange={setTranscript} />
            </div>
          </motion.div>
        </section>

        {/* Questionnaire */}
        <section id="questionnaire" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-calm p-6 sm:p-8"
          >
            <QuestionnaireForm data={questionnaire} onChange={setQuestionnaire} />
          </motion.div>
        </section>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isLoading}
            className="btn-analyze flex items-center gap-3"
          >
            <Send className="h-5 w-5" />
            {isLoading ? "Analyzing..." : "Analyze Now"}
          </button>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex max-w-lg items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <div className="card-calm p-6">
            <LoadingAnalysis />
          </div>
        )}

        {/* Results */}
        <section id="results" className="scroll-mt-20">
          <AnimatePresence>
            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-calm p-6 sm:p-8"
              >
                <ResultsPanel result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
