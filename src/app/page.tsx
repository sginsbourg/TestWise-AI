"use client";

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import type { TestLog, FeedbackType } from "@/lib/types";
import { Header } from '@/components/Header';
import { SummaryCards } from '@/components/SummaryCards';
import { InputGenerator } from '@/components/InputGenerator';
import { ModelTester } from '@/components/ModelTester';
import { LogSummarizer } from '@/components/LogSummarizer';
import { TestLogger } from '@/components/TestLogger';
import { DocumentationViewer } from '@/components/DocumentationViewer';
import { 
  generateDiverseInputsAction, 
  assessOutputQualityAction,
  summarizeLogFileAction 
} from '@/app/actions';

const runMockModel = (input: string): string => {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('happy') || lowerInput.includes('joy') || lowerInput.includes('good')) {
    return "The sentiment appears to be overwhelmingly positive, reflecting a sense of joy and satisfaction.";
  }
  if (lowerInput.includes('sad') || lowerInput.includes('angry') || lowerInput.includes('bad')) {
    return "A negative sentiment is detected, suggesting feelings of sadness or anger.";
  }
  if (lowerInput.includes('?')) {
    return "As a simple demonstration model, I cannot process interrogative sentences.";
  }
  if (lowerInput.length > 50) {
    return "The input is quite long, which can sometimes affect processing quality. The core message seems to be neutral.";
  }
  return "The input is neutral or the sentiment is not clearly discernible.";
};


export default function Home() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [generatedInputs, setGeneratedInputs] = useState<string[]>([]);
  const [logSummary, setLogSummary] = useState<string>('');
  const [isGeneratingInputs, setIsGeneratingInputs] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState<string | null>(null);

  const handleGenerateInputs = async (modelDescription: string, numberOfInputs: number) => {
    setIsGeneratingInputs(true);
    setGeneratedInputs([]);
    const result = await generateDiverseInputsAction({ modelDescription, numberOfInputs });
    if (result.success && result.data) {
      setGeneratedInputs(result.data.inputs);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsGeneratingInputs(false);
  };

  const handleRunTest = (input: string, testScenario: string) => {
    if (!input.trim() || !testScenario.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Both input and test scenario are required.',
      });
      return;
    }
    const output = runMockModel(input);
    const newLog: TestLog = {
      id: uuidv4(),
      input,
      output,
      testScenario,
    };
    setLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const handleFeedback = async (logId: string, feedback: FeedbackType) => {
    const log = logs.find(l => l.id === logId);
    if (!log) return;

    setFeedbackLoading(logId);

    const updatedLogs = logs.map(l => l.id === logId ? { ...l, feedback } : l);
    setLogs(updatedLogs);

    const result = await assessOutputQualityAction({
      modelOutput: log.output,
      feedback,
      testScenario: log.testScenario,
    });

    if (result.success && result.data) {
      const finalLogs = updatedLogs.map(l => l.id === logId ? { ...l, assessment: result.data!.assessment } : l);
      setLogs(finalLogs);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
       const revertedLogs = logs.map(l => l.id === logId ? { ...l, feedback: undefined } : l);
       setLogs(revertedLogs);
    }
    setFeedbackLoading(null);
  };

  const handleSummarizeLogs = async () => {
    setIsSummarizing(true);
    const logFileContent = logs.map(log => 
      `Test ID: ${log.id}\nScenario: ${log.testScenario}\nInput: ${log.input}\nOutput: ${log.output}\nFeedback: ${log.feedback || 'N/A'}\nAssessment: ${log.assessment || 'N/A'}`
    ).join('\n\n---\n\n');

    const result = await summarizeLogFileAction({ logFileContent });

    if (result.success && result.data) {
      setLogSummary(result.data.summary);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsSummarizing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-4">
        <SummaryCards logs={logs} />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <DocumentationViewer />
            <InputGenerator 
              onGenerate={handleGenerateInputs} 
              generatedInputs={generatedInputs}
              isLoading={isGeneratingInputs}
            />
            <ModelTester onRunTest={handleRunTest} />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-8">
            <LogSummarizer 
              onSummarize={handleSummarizeLogs} 
              summary={logSummary}
              isLoading={isSummarizing}
              hasLogs={logs.length > 0}
            />
            <TestLogger 
              logs={logs} 
              onFeedback={handleFeedback}
              feedbackLoadingId={feedbackLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
