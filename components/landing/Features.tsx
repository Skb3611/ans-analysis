import { CheckCircle } from "lucide-react";

const features = [
  "Automatic PDF Text Extraction",
  "AI-Based Answer Matching",
  "Custom Marking Criteria",
  "Instant Total Marks Calculation",
  "Clean and Professional Results View",
  "Deterministic Evaluation Mode",
];

const Features = () => {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Powerful Features</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 bg-card rounded-lg border border-border p-4 shadow-sm">
              <CheckCircle className="text-primary shrink-0" size={20} />
              <span className="text-sm font-medium text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
