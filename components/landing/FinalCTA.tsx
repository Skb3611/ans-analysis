import { Button } from "@/components/ui/button";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Start Evaluating Smarter
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload your first PDF and see how AI transforms answer sheet
          evaluation.
        </p>
        <Link href={"/analyze"}>
          <Button size="lg" className="text-base px-8 py-6">
            Analyze Your First PDF
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
