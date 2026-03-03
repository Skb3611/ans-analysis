import { Clock, ShieldCheck, FileText, Zap } from "lucide-react";

const stats = [
  { icon: Clock, label: "Saves 90% Evaluation Time" },
  { icon: ShieldCheck, label: "Consistent Marking" },
  { icon: FileText, label: "Works with Standard Text PDFs" },
  { icon: Zap, label: "Simple & Secure" },
];

const WhyUseThis = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Why Choose Our Analyzer?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Traditional answer sheet evaluation is time-consuming and prone to inconsistency.
              Our AI-powered analyzer eliminates manual grading errors and delivers results in seconds,
              so educators can focus on what matters most — teaching.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Whether you're evaluating a single student or an entire class, the system ensures
              fair, consistent, and transparent marking every time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="mx-auto mb-3 text-primary" size={28} />
                <p className="text-xs sm:text-sm font-semibold text-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUseThis;
