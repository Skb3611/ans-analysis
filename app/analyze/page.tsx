"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, GraduationCap, Loader2, Settings, Upload } from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [answerKeyText, setAnswerKeyText] = useState("");
  const [studentText, setStudentText] = useState("");
  const [maxMarks, setMaxMarks] = useState("5");
  const [correctMarks, setCorrectMarks] = useState("5");
  const [partialMarks, setPartialMarks] = useState("2");
  const [wrongMarks, setWrongMarks] = useState("0");
  const [loading, setLoading] = useState(false);

  const extractPdf = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/extract-pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to extract PDF");
    const data = await response.json();
    return data.text;
  };

  function normalize(text: string) {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  const loadSampleData = async (type: "answerKey" | "student") => {
    try {
      const formData = new FormData();
      formData.append("useSampleData", "true");
      formData.append("sampleType", type === "student" ? "student" : "key");

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to load sample data");
      const data = await response.json();

      if (type === "answerKey") {
        setAnswerKeyText(data.text);
      } else {
        setStudentText(data.text);
      }
    } catch (error) {
      alert("Failed to load sample data");
    }
  };

  const handleAnswerKeyUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractPdf(file);
      setAnswerKeyText(text[0]);
    } catch (error) {
      alert("Failed to extract answer key PDF");
    }
  };

  const handleStudentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractPdf(file);
      setStudentText(text[0]);
    } catch (error) {
      alert("Failed to extract student PDF");
    }
  };

  const handleAnalyze = async () => {
    if (!answerKeyText || !studentText) {
      alert("Please upload both answer key and student PDF");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correctText: normalize(answerKeyText),
          studentText: normalize(studentText),
          maxMarks: parseInt(maxMarks),
          correctMarks: parseInt(correctMarks),
          partialMarks: parseInt(partialMarks),
          wrongMarks: parseInt(wrongMarks),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[v0] Analysis API error:", errorData);
        throw new Error(errorData.error || "Failed to analyze");
      }
      const analysis = await response.json();

      // Store results and navigate
      sessionStorage.setItem("analysisResults", JSON.stringify(analysis));
      router.push("/results");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to analyze answers";
      console.error("[v0] Error during analysis:", error);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back</span>
        </button>

        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Analyze Answer Sheet
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Upload your PDFs and let AI evaluate the answers automatically.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Answer Key Section */}
          <Card className="p-0 overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-secondary/40 border-b border-border/60">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Step 1: Upload Answer Key PDF
                </h2>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Extract correct answers from PDF</p>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleAnswerKeyUpload}
                    className="file:bg-primary/5 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium file:text-xs hover:border-primary/40 transition-colors cursor-pointer text-xs sm:text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => loadSampleData("answerKey")}
                  className="shrink-0 gap-2 border-dashed h-10 sm:h-10 text-xs sm:text-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Load Sample
                </Button>
              </div>
              {answerKeyText && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Preview</p>
                  <div className="bg-secondary/30 rounded-lg p-3 sm:p-4 max-h-40 overflow-y-auto border border-border/40">
                    <p className="text-xs sm:text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {answerKeyText.slice(0, 500)}
                    </p>
                    {answerKeyText.length > 500 && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 italic">
                        ... (truncated)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Marking Criteria Section */}
          <Card className="p-0 overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-secondary/40 border-b border-border/60">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Step 2: Enter Marking Criteria
                </h2>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Define how answers are scored</p>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "Max Marks", value: maxMarks, setter: setMaxMarks, color: "text-foreground" },
                  { label: "Correct", value: correctMarks, setter: setCorrectMarks, color: "text-emerald-600" },
                  { label: "Partial", value: partialMarks, setter: setPartialMarks, color: "text-amber-600" },
                  { label: "Wrong", value: wrongMarks, setter: setWrongMarks, color: "text-destructive" },
                ].map((field) => (
                  <div key={field.label} className="space-y-2">
                    <label className={`text-[11px] sm:text-sm font-medium ${field.color} block uppercase tracking-wider`}>
                      {field.label}
                    </label>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="text-center font-bold text-base sm:text-lg h-10 sm:h-12"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Student PDF Section */}
          <Card className="p-0 overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-secondary/40 border-b border-border/60">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">
                  Step 3: Upload Student PDF
                </h2>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Extract student responses automatically</p>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleStudentUpload}
                    className="file:bg-primary/5 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium file:text-xs hover:border-primary/40 transition-colors cursor-pointer text-xs sm:text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => loadSampleData("student")}
                  className="shrink-0 gap-2 border-dashed h-10 sm:h-10 text-xs sm:text-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Load Sample
                </Button>
              </div>
              {studentText && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Preview</p>
                  <div className="bg-secondary/30 rounded-lg p-3 sm:p-4 max-h-40 overflow-y-auto border border-border/40">
                    <p className="text-xs sm:text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {studentText.slice(0, 500)}
                    </p>
                    {studentText.length > 500 && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 italic">
                        ... (truncated)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={loading || !answerKeyText || !studentText}
            size="lg"
            className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              "Analyze Answer Sheet"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
