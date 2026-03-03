import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Zap, BookOpen, Brain } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Grading</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
              Grade Papers <span className="text-primary">Instantly</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Upload answer keys and student papers. Our AI analyzes and grades them in seconds with detailed feedback.
            </p>
            <Link href="/analyze">
              <Button size="lg" className="rounded-lg h-12 px-8 text-base">
                Start Grading Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose GradeAI?</h2>
          <p className="text-lg text-muted-foreground">Everything you need for efficient grading</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Grade hundreds of papers in seconds. No more manual checking.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">Intelligent grading that understands context and provides feedback.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Detailed Feedback</h3>
                <p className="text-muted-foreground">Get comprehensive insights for each question with actionable feedback.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Accurate Scoring</h3>
                <p className="text-muted-foreground">Customizable marking criteria for consistent and fair evaluation.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-12 bg-secondary/30 border border-border">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Upload Key', desc: 'Upload the answer key PDF' },
              { num: 2, title: 'Set Criteria', desc: 'Define marking scheme' },
              { num: 3, title: 'Upload Papers', desc: 'Submit student papers' },
              { num: 4, title: 'Get Results', desc: 'Instant grades & feedback' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-gradient-to-br from-primary/5 via-transparent to-transparent py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Save Time on Grading?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join educators who are transforming their grading workflow.</p>
          <Link href="/analyze">
            <Button size="lg" className="rounded-lg h-12 px-8 text-base">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
