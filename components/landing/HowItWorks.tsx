import { Card, CardContent } from "@/components/ui/card";
import { Upload, Settings, FileUp, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Answer Key",
    description: "Extract correct answers from PDF.",
  },
  {
    icon: Settings,
    title: "Define Marking Criteria",
    description: "Set marks for correct, partial, and wrong answers.",
  },
  {
    icon: FileUp,
    title: "Upload Student Paper",
    description: "Extract student responses automatically.",
  },
  {
    icon: Sparkles,
    title: "Get AI Evaluation",
    description: "Receive marks and feedback instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 pb-6 px-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="text-primary" size={24} />
                </div>
                <span className="inline-block text-xs font-semibold text-muted-foreground">Step {index + 1}</span>
                <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
