
"use client";

import { useState } from 'react';
import { Lightbulb, Loader2, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InputGeneratorProps {
  onGenerate: (modelDescription: string, numberOfInputs: number) => void;
  generatedInputs: string[];
  isLoading: boolean;
}

export function InputGenerator({ onGenerate, generatedInputs, isLoading }: InputGeneratorProps) {
  const [modelDescription, setModelDescription] = useState('A sentiment analysis model that classifies text as positive, negative, or neutral.');
  const [numberOfInputs, setNumberOfInputs] = useState(3);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(modelDescription, numberOfInputs);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Input copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>Diverse Input Generator</CardTitle>
        </div>
        <CardDescription>
          This tool uses an AI to generate a variety of test inputs based on your model's description. 
          It helps you explore edge cases, common scenarios, and potential failure points automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="model-description">Model Description</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clearly describe the AI model you want to test, including its purpose and expected input types. <br/>A good description leads to more relevant and effective test inputs.</p>
                </TooltipContent>
              </Tooltip>
              <Textarea
                id="model-description"
                value={modelDescription}
                onChange={(e) => setModelDescription(e.target.value)}
                placeholder="e.g., A sentiment analysis model..."
                rows={4}
                required
              />
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="num-inputs">Number of Inputs</Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the number of distinct test inputs you want the AI to generate. <br/>You can choose between 1 and 10 inputs per generation.</p>
                </TooltipContent>
              </Tooltip>
              <Input
                id="num-inputs"
                type="number"
                value={numberOfInputs}
                onChange={(e) => setNumberOfInputs(Math.max(1, Math.min(10, parseInt(e.target.value, 10))))}
                min="1"
                max="10"
                required
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : 'Generate Inputs'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click here to trigger the AI-powered input generation. <br/>The generated inputs will appear below, ready to be copied and used for testing.</p>
              </TooltipContent>
            </Tooltip>
          </form>
        </TooltipProvider>

        {generatedInputs.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Generated Inputs:</h4>
            <TooltipProvider>
              <ul className="space-y-2">
                {generatedInputs.map((input, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 p-3 rounded-md bg-secondary">
                    <p className="text-sm text-secondary-foreground flex-1">{input}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleCopy(input)}>
                          <Copy className="h-4 w-4"/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy this input to your clipboard. You can then paste it into the 'AI Model Tester' to run a test.</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
