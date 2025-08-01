// src/ai/flows/qualitative-feedback.ts
'use server';

/**
 * @fileOverview A Genkit flow for providing qualitative feedback on AI model outputs.
 *
 * - assessOutputQuality - A function that assesses the quality of AI model outputs based on qualitative feedback.
 * - QualitativeFeedbackInput - The input type for the assessOutputQuality function.
 * - QualitativeFeedbackOutput - The return type for the assessOutputQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QualitativeFeedbackInputSchema = z.object({
  modelOutput: z.string().describe('The output of the AI model to be assessed.'),
  feedback: z
    .enum(['Acceptable', 'Needs Improvement', 'Unacceptable'])
    .describe('Qualitative feedback on the model output.'),
  testScenario: z.string().describe('Description of the test scenario.'),
});
export type QualitativeFeedbackInput = z.infer<typeof QualitativeFeedbackInputSchema>;

const QualitativeFeedbackOutputSchema = z.object({
  assessment: z
    .string()
    .describe(
      'A detailed assessment of the model output based on the provided feedback and test scenario.'
    ),
});
export type QualitativeFeedbackOutput = z.infer<typeof QualitativeFeedbackOutputSchema>;

export async function assessOutputQuality(
  input: QualitativeFeedbackInput
): Promise<QualitativeFeedbackOutput> {
  return assessOutputQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'qualitativeFeedbackPrompt',
  input: {schema: QualitativeFeedbackInputSchema},
  output: {schema: QualitativeFeedbackOutputSchema},
  prompt: `You are an AI assessment tool that analyzes AI model outputs based on qualitative feedback.

  Analyze the model output in the context of the provided feedback and test scenario. Provide a detailed assessment of the output quality.

  Test Scenario: {{{testScenario}}}
  Model Output: {{{modelOutput}}}
  Feedback: {{{feedback}}}
  `,
});

const assessOutputQualityFlow = ai.defineFlow(
  {
    name: 'assessOutputQualityFlow',
    inputSchema: QualitativeFeedbackInputSchema,
    outputSchema: QualitativeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
