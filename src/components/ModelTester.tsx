"use client";

import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
        <div className="space-y-4">
          <div>
            <Label htmlFor="test-scenario">Test Scenario</Label>
            <Input
              id="test-scenario"
              value={testScenario}
              onChange={(e) => setTestScenario(e.target.value)}
              placeholder="e.g., Testing response to a question"
            />
          </div>
          <div>
            <Label htmlFor="test-input">Input for Model</Label>
            <Textarea
              id="test-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to test..."
              rows={4}
            />
          </div>
          <Button onClick={handleRunTest} className="w-full">
            Run Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
