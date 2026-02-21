import { useCallback, useRef, useState } from "react";
import { Upload, Music, X, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioUploaderProps {
  onFileChange: (file: File | null) => void;
}

const AudioUploader = ({ onFileChange }: AudioUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    onFileChange(f);
    const url = URL.createObjectURL(f);
    setAudioUrl(url);
    setIsPlaying(false);
  }, [onFileChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === "audio/wav" || f.type === "audio/mpeg" || f.name.endsWith(".wav") || f.name.endsWith(".mp3"))) {
      handleFile(f);
    }
  }, [handleFile]);

  const handleRemove = () => {
    setFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
    onFileChange(null);
    if (audioRef.current) audioRef.current.pause();
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Music className="h-5 w-5 text-primary" />
        Audio Upload
      </h3>
      <p className="text-sm text-muted-foreground">Upload a voice recording (.wav or .mp3) describing how you feel</p>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".wav,.mp3,audio/wav,audio/mpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-calm-lavender">
                <Upload className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Drop your audio file here</p>
                <p className="mt-1 text-sm text-muted-foreground">or click to browse • WAV, MP3</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-calm-lavender transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-secondary-foreground" />
                ) : (
                  <Play className="h-5 w-5 text-secondary-foreground ml-0.5" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={handleRemove}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="mt-3 w-full"
                controls
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioUploader;
