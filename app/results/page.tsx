"use client"
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, CheckCircle2, AlertCircle, XCircle, TrendingUp, Award, BarChart3, MessageSquareText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { navigate } from 'next/dist/client/components/segment-cache/navigation';

interface Question {
  question: string;
  correctAnswer: string;
  studentAnswer: string;
  marks: number;
  maxMarks: number;
  result: string;
  feedback: string;
}

interface Analysis {
  questions: Question[];
  totalMarks: number;
}

const ResultsPage = () => {
 const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResults');
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!analysis) {
    return (
      <main className="min-h-screen bg-linear-to-b from-background to-secondary/20 flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md w-full border-border/60 shadow-md">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">No Results Found</p>
          <p className="text-sm text-muted-foreground mb-6">
            It looks like you haven't analyzed any answer sheets yet.
          </p>
          <Button onClick={() => router.push('/analyze')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back to Analysis
          </Button>
        </Card>
      </main>
    );
  }

  const totalMaxMarks = analysis.questions.reduce((sum: number, q: Question) => sum + q.maxMarks, 0);
  const percentageNum = totalMaxMarks > 0 ? (analysis.totalMarks / totalMaxMarks) * 100 : 0;
  const percentage = percentageNum.toFixed(1);

  const correctCount = analysis.questions.filter((q: Question) => q.result.toLowerCase() === 'correct').length;
  const partialCount = analysis.questions.filter((q: Question) => q.result.toLowerCase() === 'partial').length;
  const wrongCount = analysis.questions.filter((q: Question) => q.result.toLowerCase() === 'wrong').length;

  const getResultIcon = (result: string) => {
    switch (result.toLowerCase()) {
      case 'correct':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'wrong':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getResultBadgeClasses = (result: string) => {
    switch (result.toLowerCase()) {
      case 'correct':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'partial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'wrong':
        return 'bg-red-50 text-destructive border-red-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent Work!';
    if (percentage >= 80) return 'Great Job!';
    if (percentage >= 70) return 'Good Effort';
    if (percentage >= 60) return 'Needs Improvement';
    return 'Keep Practicing';
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-600';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-destructive';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '[&>div]:bg-emerald-500';
    if (percentage >= 60) return '[&>div]:bg-amber-500';
    return '[&>div]:bg-destructive';
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-secondary/20 py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={() => router.push('/analyze')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back</span>
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="gap-2 text-muted-foreground"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>

        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Analysis Results</h1>
          <p className="text-sm sm:text-base text-muted-foreground">AI-generated evaluation of student responses.</p>
        </div>

        {/* Score Summary */}
        <Card className="p-0 overflow-hidden border-border/60 shadow-sm mb-6 md:mb-8">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-secondary/40 border-b border-border/60">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Score Summary</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              {/* Score Circle */}
              <div className="flex flex-col items-center gap-3 min-w-[150px] sm:min-w-[180px]">
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-secondary bg-background shadow-inner">
                  <div className="text-center">
                    <span className={`text-3xl sm:text-4xl font-bold ${getPerformanceColor(parseFloat(percentage))}`}>
                      {percentage}
                    </span>
                    <span className="text-base sm:text-lg text-muted-foreground">%</span>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${getPerformanceColor(parseFloat(percentage))}`}>
                  {getPerformanceMessage(parseFloat(percentage))}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {analysis.totalMarks} out of {totalMaxMarks} marks
                </p>
                <Progress
                  value={parseFloat(percentage)}
                  className={`h-2 w-32 sm:w-40 ${getProgressColor(parseFloat(percentage))}`}
                />
              </div>

              {/* Stats Breakdown */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <Card className="p-3 sm:p-4 text-center border-emerald-200 bg-emerald-50/50 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                  <div className="flex items-center gap-2 sm:flex-col sm:gap-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 sm:mx-auto sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Correct</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-600 sm:mt-1">{correctCount}</p>
                </Card>
                <Card className="p-3 sm:p-4 text-center border-amber-200 bg-amber-50/50 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                  <div className="flex items-center gap-2 sm:flex-col sm:gap-0">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 sm:mx-auto sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Partial</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-amber-600 sm:mt-1">{partialCount}</p>
                </Card>
                <Card className="p-3 sm:p-4 text-center border-red-200 bg-red-50/50 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                  <div className="flex items-center gap-2 sm:flex-col sm:gap-0">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive sm:mx-auto sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Wrong</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-destructive sm:mt-1">{wrongCount}</p>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        {/* Questions Breakdown */}
        <Card className="p-0 overflow-hidden border-border/60 shadow-sm mb-6 md:mb-8">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-secondary/40 border-b border-border/60">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Question Breakdown</h2>
          </div>
          <div className="divide-y divide-border/60">
            {analysis.questions.map((q: Question, index: number) => (
              <div key={index} className="p-4 sm:p-6">
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {getResultIcon(q.result)}
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      Question {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-xs sm:text-sm font-bold text-foreground bg-secondary/60 px-3 py-1 rounded-full">
                      {q.marks}/{q.maxMarks}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border capitalize ${getResultBadgeClasses(q.result)}`}>
                      {q.result}
                    </span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="space-y-4 pl-0 sm:pl-8">
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Question</p>
                    <p className="text-xs sm:text-sm text-foreground">{q.question}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-secondary/30 rounded-lg p-3 border border-border/40">
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Student's Answer</p>
                      <p className="text-xs sm:text-sm text-foreground">{q.studentAnswer || 'No answer provided'}</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3 border border-border/40">
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Correct Answer</p>
                      <p className="text-xs sm:text-sm text-foreground">{q.correctAnswer}</p>
                    </div>
                  </div>

                  {q.feedback && (
                    <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <MessageSquareText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider mb-1">Feedback</p>
                        <p className="text-xs sm:text-sm text-foreground italic">"{q.feedback}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => router.push('/analyze')}
            variant="outline"
            className="flex-1 h-12 text-sm sm:text-base gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze Another
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="flex-1 h-12 text-sm sm:text-base gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ResultsPage;
