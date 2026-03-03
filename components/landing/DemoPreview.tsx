import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DemoPreview = () => {
  return (
    <section className="py-12 md:py-20 bg-section-alt">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">See It In Action</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border border-border overflow-hidden">
            <CardHeader className="border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Evaluation Result</CardTitle>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">Sample</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Total Score */}
              <div className="bg-secondary rounded-xl p-4 sm:p-6 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Marks</p>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">12 <span className="text-muted-foreground font-normal text-xl sm:text-2xl">/ 15</span></p>
              </div>

              {/* Sample Question */}
              <div className="border border-border rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm sm:text-base">Q1</span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-[10px] sm:text-xs">Partial</Badge>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">3 / 5</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Feedback:</span> Missing key definition components.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;
