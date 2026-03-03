'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, CheckCircle2, AlertCircle, XCircle, TrendingUp } from 'lucide-react';

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

export default function ResultsPage() {
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
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center px-4">
        <Card className="p-8 text-center">
          <p className="text-foreground mb-4">No analysis results found.</p>
          <Button onClick={() => router.push('/analyze')}>
            Go Back to Analysis
          </Button>
        </Card>
      </main>
    );
  }

  const totalMaxMarks = analysis.questions.reduce((sum, q) => sum + q.maxMarks, 0);
  const percentageNum = totalMaxMarks > 0 ? (analysis.totalMarks / totalMaxMarks) * 100 : 0;
  const percentage = percentageNum.toFixed(1);

  const correctCount = analysis.questions.filter(q => q.result.toLowerCase() === 'correct').length;
  const partialCount = analysis.questions.filter(q => q.result.toLowerCase() === 'partial').length;
  const wrongCount = analysis.questions.filter(q => q.result.toLowerCase() === 'wrong').length;

  const getResultIcon = (result: string) => {
    switch (result.toLowerCase()) {
      case 'correct':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'wrong':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'correct':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      case 'partial':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 'wrong':
        return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800';
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
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/analyze')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Analysis Results</h1>

        {/* Score Summary */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-primary/20">
          <div className="space-y-6">
            <div className="text-center">
              <p className={`text-lg font-semibold mb-2 ${getPerformanceColor(parseFloat(percentage))}`}>
                {getPerformanceMessage(parseFloat(percentage))}
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-foreground">{percentage}</span>
                <span className="text-2xl text-muted-foreground">%</span>
              </div>
              <p className="text-muted-foreground mt-2">
                {analysis.totalMarks} out of {totalMaxMarks} marks
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-muted-foreground mb-1">Correct</p>
                <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-muted-foreground mb-1">Partial</p>
                <p className="text-2xl font-bold text-yellow-600">{partialCount}</p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-muted-foreground mb-1">Wrong</p>
                <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Question Breakdown</h2>
          {analysis.questions.map((q, index) => (
            <Card key={index} className={`p-6 border-l-4 ${getResultColor(q.result)}`} style={{
              borderLeftColor: q.result.toLowerCase() === 'correct' ? '#16a34a' : 
                              q.result.toLowerCase() === 'partial' ? '#eab308' : '#dc2626'
            }}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {getResultIcon(q.result)}
                    <h3 className="text-lg font-semibold text-foreground">
                      Question {index + 1}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        {q.marks}/{q.maxMarks}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      q.result.toLowerCase() === 'correct' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                      q.result.toLowerCase() === 'partial' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {q.result}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Question</p>
                    <p className="text-foreground">{q.question}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4 border border-border">
                      <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Student's Answer</p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{q.studentAnswer || 'No answer provided'}</p>
                    </div>
                    <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2 uppercase tracking-wider">Correct Answer</p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{q.correctAnswer}</p>
                    </div>
                  </div>

                  {q.feedback && (
                    <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                      <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Feedback</p>
                      <p className="text-sm text-foreground italic">
                        "{q.feedback}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t">
          <Button
            onClick={() => router.push('/analyze')}
            variant="outline"
            className="flex-1 h-11"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analyze Another
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="flex-1 h-11"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
