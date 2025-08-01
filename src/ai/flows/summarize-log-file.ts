'use server';

/**
 * @fileOverview Summarizes a log file of test results, identifying recurring patterns of failure.
 *
 * - summarizeLogFile - A function that summarizes the log file.
 * - SummarizeLogFileInput - The input type for the summarizeLogFile function.
 * - SummarizeLogFileOutput - The return type for the summarizeLogFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLogFileInputSchema = z.object({
  logFileContent: z
    .string()
    .describe('The content of the log file to be summarized.'),
});
export type SummarizeLogFileInput = z.infer<typeof SummarizeLogFileInputSchema>;

const SummarizeLogFileOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the log file, identifying recurring patterns of failure.'
    ),
});
export type SummarizeLogFileOutput = z.infer<typeof SummarizeLogFileOutputSchema>;

export async function summarizeLogFile(
  input: SummarizeLogFileInput
): Promise<SummarizeLogFileOutput> {
  return summarizeLogFileFlow(input);
}

const summarizeLogFilePrompt = ai.definePrompt({
  name: 'summarizeLogFilePrompt',
  input: {schema: SummarizeLogFileInputSchema},
  output: {schema: SummarizeLogFileOutputSchema},
  prompt: `You are an AI assistant that analyzes test log files and summarizes recurring patterns of failure.

  Analyze the following log file content:
  \n
  {{{logFileContent}}}
  \n
  Identify any recurring patterns of failure and provide a concise summary of these patterns.
  The summary should be no more than 200 words.
  `,
});

const summarizeLogFileFlow = ai.defineFlow(
  {
    name: 'summarizeLogFileFlow',
    inputSchema: SummarizeLogFileInputSchema,
    outputSchema: SummarizeLogFileOutputSchema,
  },
  async input => {
    const {output} = await summarizeLogFilePrompt(input);
    return output!;
  }
);
