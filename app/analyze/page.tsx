'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const [answerKeyText, setAnswerKeyText] = useState('');
  const [studentText, setStudentText] = useState('');
  const [maxMarks, setMaxMarks] = useState('5');
  const [correctMarks, setCorrectMarks] = useState('5');
  const [partialMarks, setPartialMarks] = useState('2');
  const [wrongMarks, setWrongMarks] = useState('0');
  const [loading, setLoading] = useState(false);

  const extractPdf = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/extract-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to extract PDF');
    const data = await response.json();
    return data.text;
  };

  const loadSampleData = async (type: 'answerKey' | 'student') => {
    try {
      const formData = new FormData();
      formData.append('useSampleData', 'true');
      formData.append('sampleType', type === 'student' ? 'student' : 'key');

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to load sample data');
      const data = await response.json();
      
      if (type === 'answerKey') {
        setAnswerKeyText(data.text);
      } else {
        setStudentText(data.text);
      }
    } catch (error) {
      alert('Failed to load sample data');
    }
  };

  const handleAnswerKeyUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractPdf(file);
      setAnswerKeyText(text);
    } catch (error) {
      alert('Failed to extract answer key PDF');
    }
  };

  const handleStudentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractPdf(file);
      setStudentText(text);
    } catch (error) {
      alert('Failed to extract student PDF');
    }
  };

  const handleAnalyze = async () => {
    if (!answerKeyText || !studentText) {
      alert('Please upload both answer key and student PDF');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correctText: answerKeyText,
          studentText: studentText,
          maxMarks: parseInt(maxMarks),
          correctMarks: parseInt(correctMarks),
          partialMarks: parseInt(partialMarks),
          wrongMarks: parseInt(wrongMarks),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[v0] Analysis API error:', errorData);
        throw new Error(errorData.error || 'Failed to analyze');
      }
      const analysis = await response.json();
      console.log('[v0] Analysis successful:', analysis);

      // Store results and navigate
      sessionStorage.setItem('analysisResults', JSON.stringify(analysis));
      router.push('/results');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to analyze answers';
      console.error('[v0] Error during analysis:', error);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Analyze Answer Sheet</h1>

        <div className="space-y-6">
          {/* Answer Key Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 1: Upload Answer Key PDF</h2>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleAnswerKeyUpload}
              className="mb-4"
            />
            <Button
              variant="outline"
              onClick={() => loadSampleData('answerKey')}
              className="mb-4"
            >
              Load Sample Answer Key
            </Button>
            {answerKeyText && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <div className="bg-secondary/50 rounded p-4 max-h-40 overflow-y-auto border border-border">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{answerKeyText.slice(0, 500)}</p>
                  {answerKeyText.length > 500 && <p className="text-xs text-muted-foreground mt-2">... (truncated)</p>}
                </div>
              </div>
            )}
          </Card>

          {/* Marking Criteria Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 2: Enter Marking Criteria</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Max Marks Per Question</label>
                <Input
                  type="number"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Marks When Correct</label>
                <Input
                  type="number"
                  value={correctMarks}
                  onChange={(e) => setCorrectMarks(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Marks When Partial</label>
                <Input
                  type="number"
                  value={partialMarks}
                  onChange={(e) => setPartialMarks(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Marks When Wrong</label>
                <Input
                  type="number"
                  value={wrongMarks}
                  onChange={(e) => setWrongMarks(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Student PDF Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 3: Upload Student PDF</h2>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleStudentUpload}
              className="mb-4"
            />
            <Button
              variant="outline"
              onClick={() => loadSampleData('student')}
              className="mb-4"
            >
              Load Sample Student Answers
            </Button>
            {studentText && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <div className="bg-secondary/50 rounded p-4 max-h-40 overflow-y-auto border border-border">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{studentText.slice(0, 500)}</p>
                  {studentText.length > 500 && <p className="text-xs text-muted-foreground mt-2">... (truncated)</p>}
                </div>
              </div>
            )}
          </Card>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={loading || !answerKeyText || !studentText}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Answer Sheet'
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
