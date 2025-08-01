"use client";

import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ModelTesterProps {
  onRunTest: (input: string, testScenario: string) => void;
}

export function ModelTester({ onRunTest }: ModelTesterProps) {
  const [input, setInput] = useState('');
  const [testScenario, setTestScenario] = useState('');

  const handleRunTest = () => {
    onRunTest(input, testScenario);
    setInput('');
    setTestScenario('');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <PlayCircle className="h-6 w-6 text-primary" />
          <CardTitle>AI Model Tester</CardTitle>
        </div>
        <CardDescription>Input text and a scenario to test the model's response.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="space-y-4">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="test-scenario">Test Scenario</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Describe the situation you are testing. For example, "Testing a positive sentence".</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="test-scenario"
                value={testScenario}
                onChange={(e) => setTestScenario(e.target.value)}
                placeholder="e.g., Testing response to a question"
              />
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="test-input">Input for Model</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the text you want the AI model to process. You can paste a generated input here.</p>
                </TooltipContent>
              </Tooltip>
              <Textarea
                id="test-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to test..."
                rows={4}
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleRunTest} className="w-full">
                  Run Test
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to send the input and scenario to the mock model and see the result in the Test Logs.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
