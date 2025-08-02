
"use client";

import { History, Loader2, Check, HelpCircle, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { TestLog, FeedbackType } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TestLoggerProps {
  logs: TestLog[];
  onFeedback: (logId: string, feedback: FeedbackType) => void;
  feedbackLoadingId: string | null;
}

const feedbackOptions: {
  value: FeedbackType;
  label: string;
  icon: React.ElementType;
  className: string;
  tooltip: string;
}[] = [
  { value: 'Acceptable', label: 'Acceptable', icon: Check, className: 'bg-accent hover:bg-accent/90 text-accent-foreground', tooltip: 'The model output is correct and meets all expectations for the given scenario.' },
  { value: 'Needs Improvement', label: 'Needs Improvement', icon: HelpCircle, className: 'bg-warning hover:bg-warning/90 text-warning-foreground', tooltip: 'The output is partially correct or acceptable, but has minor issues or could be better.' },
  { value: 'Unacceptable', label: 'Unacceptable', icon: X, className: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground', tooltip: 'The output is incorrect, irrelevant, harmful, or otherwise a clear failure.' },
];

export function TestLogger({ logs, onFeedback, feedbackLoadingId }: TestLoggerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <History className="h-6 w-6 text-primary" />
          <CardTitle>Test Logs</CardTitle>
        </div>
        <CardDescription>
          Review the results of each test. Provide qualitative feedback on the model's output, which helps generate a more accurate AI assessment of its performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-center text-muted-foreground">No tests run yet. Run a test to see logs here.</p>
        ) : (
          <TooltipProvider>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-lg border bg-card">
                  <p className="text-sm font-medium"><strong>Scenario:</strong> {log.testScenario}</p>
                  <p className="text-sm mt-1"><strong>Input:</strong> {log.input}</p>
                  <p className="text-sm mt-1 p-2 rounded-md bg-secondary text-secondary-foreground"><strong>Output:</strong> {log.output}</p>
                  
                  <div className="mt-3">
                    {log.feedback ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                           <Tooltip>
                              <TooltipTrigger asChild>
                                <AccordionTrigger>Qualitative Feedback Assessment</AccordionTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This is the AI's detailed analysis of the model's output, <br/>based on the feedback you provided. Click to expand and read the assessment.</p>
                              </TooltipContent>
                            </Tooltip>
                          <AccordionContent className="whitespace-pre-wrap text-sm">
                            {log.assessment || 'Loading assessment...'}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Provide Feedback:</p>
                        <div className="flex gap-2">
                          {feedbackOptions.map(option => (
                            <Tooltip key={option.value}>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  className={option.className}
                                  onClick={() => onFeedback(log.id, option.value)}
                                  disabled={feedbackLoadingId !== null}
                                >
                                  {feedbackLoadingId === log.id ? 
                                    <Loader2 className="h-4 w-4 animate-spin"/> :
                                    <option.icon className="h-4 w-4" />
                                  }
                                  <span className="sr-only">{option.label}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{option.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
