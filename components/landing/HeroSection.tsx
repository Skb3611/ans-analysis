import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, BarChart3, Award } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-28 bg-hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              AI-Powered PDF Answer Sheet Evaluation
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
              Upload an answer key and student answer sheet in PDF format.
              Automatically analyze, compare, and generate marks with AI in seconds.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <Link href={"/analyze"} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 h-14 sm:h-12">
                  Start Analyzing
                </Button>
              </Link>
            </div>
          </div>

          {/* Mock Dashboard Illustration */}
          <div className="bg-card border border-border rounded-xl shadow-lg p-4 sm:p-6 space-y-4 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-semibold text-foreground">Evaluation Results</span>
              <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">Live Preview</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <BarChart3 className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-2xl font-bold text-foreground">12/15</p>
                <p className="text-xs text-muted-foreground">Total Score</p>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <Award className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-2xl font-bold text-foreground">80%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { q: "Q1", status: "Correct", marks: "5/5", color: "text-green-600" },
                { q: "Q2", status: "Partial", marks: "3/5", color: "text-amber-600" },
                { q: "Q3", status: "Correct", marks: "4/5", color: "text-green-600" },
              ].map((item) => (
                <div key={item.q} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{item.q}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
                    <span className="text-sm text-muted-foreground">{item.marks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
