'use server';

/**
 * @fileOverview Summarizes test patterns from log files using GenAI to identify recurring failures.
 *
 * - summarizeTestPatterns - A function to summarize test patterns.
 * - SummarizeTestPatternsInput - The input type for the summarizeTestPatterns function.
 * - SummarizeTestPatternsOutput - The return type for the summarizeTestPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTestPatternsInputSchema = z.object({
  logFileContent: z
    .string()
    .describe('The content of the test log file to be analyzed.'),
});
export type SummarizeTestPatternsInput = z.infer<typeof SummarizeTestPatternsInputSchema>;

const SummarizeTestPatternsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the test patterns, highlighting recurring failure patterns and potential weaknesses.'
    ),
});
export type SummarizeTestPatternsOutput = z.infer<typeof SummarizeTestPatternsOutputSchema>;

export async function summarizeTestPatterns(
  input: SummarizeTestPatternsInput
): Promise<SummarizeTestPatternsOutput> {
  return summarizeTestPatternsFlow(input);
}

const summarizeTestPatternsPrompt = ai.definePrompt({
  name: 'summarizeTestPatternsPrompt',
  input: {schema: SummarizeTestPatternsInputSchema},
  output: {schema: SummarizeTestPatternsOutputSchema},
  prompt: `You are an AI assistant designed to analyze test log files and summarize recurring patterns of failure to identify model weaknesses.

  Analyze the following test log file content:
  \n
  {{{logFileContent}}}
  \n
  Identify any recurring patterns of failure, common error types, and potential weaknesses in the model's performance.
  Provide a concise summary of these patterns, highlighting areas where the model consistently underperforms or exhibits vulnerabilities.
  The summary should be no more than 250 words.
  `,
});

const summarizeTestPatternsFlow = ai.defineFlow(
  {
    name: 'summarizeTestPatternsFlow',
    inputSchema: SummarizeTestPatternsInputSchema,
    outputSchema: SummarizeTestPatternsOutputSchema,
  },
  async input => {
    const {output} = await summarizeTestPatternsPrompt(input);
    return output!;
  }
);
