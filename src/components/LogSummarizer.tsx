"use client";

import { FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface LogSummarizerProps {
  onSummarize: () => void;
  summary: string;
  isLoading: boolean;
  hasLogs: boolean;
}

export function LogSummarizer({ onSummarize, summary, isLoading, hasLogs }: LogSummarizerProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle>Automated Log Summarizer</CardTitle>
        </div>
        <CardDescription>Use AI to find recurring patterns in test failures.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button onClick={onSummarize} disabled={isLoading || !hasLogs} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : 'Summarize Test Logs'}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {hasLogs
                  ? "Click to have an AI analyze all your test logs and identify failure patterns."
                  : "Run some tests first to enable log summarization."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {summary && (
          <div className="p-4 rounded-md bg-secondary">
            <h4 className="font-semibold mb-2 text-secondary-foreground">AI Summary:</h4>
            <p className="text-sm text-secondary-foreground whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
