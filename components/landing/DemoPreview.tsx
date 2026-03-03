import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DemoPreview = () => {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">See It In Action</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border border-border">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Evaluation Result</CardTitle>
                <Badge variant="secondary" className="text-xs">Sample</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Total Score */}
              <div className="bg-secondary rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Marks</p>
                <p className="text-4xl font-bold text-foreground">12 <span className="text-muted-foreground font-normal">/ 15</span></p>
              </div>

              {/* Sample Question */}
              <div className="border border-border rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Q1</span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">Partial</Badge>
                  </div>
                  <span className="text-sm font-semibold text-foreground">3 / 5</span>
                </div>
                <p className="text-sm text-muted-foreground">
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
