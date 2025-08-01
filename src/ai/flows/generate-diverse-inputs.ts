'use server';

/**
 * @fileOverview Generates diverse inputs for AI model testing using GenAI.
 *
 * - generateDiverseInputs - A function to generate diverse input scenarios.
 * - DiverseInputsInput - The input type for the generateDiverseInputs function.
 * - DiverseInputsOutput - The output type for the generateDiverseInputs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiverseInputsInputSchema = z.object({
  modelDescription: z.string().describe('A description of the AI model being tested, its purpose, and expected inputs.'),
  numberOfInputs: z.number().int().min(1).max(10).default(3).describe('The number of diverse input scenarios to generate.'),
});
export type DiverseInputsInput = z.infer<typeof DiverseInputsInputSchema>;

const DiverseInputsOutputSchema = z.object({
  inputs: z.array(
    z.string().describe('A diverse input scenario for the AI model.')
  ).describe('An array of diverse input scenarios.')
});
export type DiverseInputsOutput = z.infer<typeof DiverseInputsOutputSchema>;

export async function generateDiverseInputs(input: DiverseInputsInput): Promise<DiverseInputsOutput> {
  return generateDiverseInputsFlow(input);
}

const generateDiverseInputsPrompt = ai.definePrompt({
  name: 'generateDiverseInputsPrompt',
  input: {schema: DiverseInputsInputSchema},
  output: {schema: DiverseInputsOutputSchema},
  prompt: `You are an AI assistant designed to generate diverse input scenarios for testing AI models.

  Given the following description of an AI model:
  {{modelDescription}}

  Generate {{numberOfInputs}} diverse input scenarios that thoroughly test the model's behavior across a wide range of situations.

  The input scenarios should be detailed and varied, covering edge cases, common use cases, and potentially problematic inputs.

  Return the scenarios as a JSON array of strings.

  For example:
  {
    "inputs": [
      "Input scenario 1",
      "Input scenario 2",
      "Input scenario 3"
    ]
  }
  `,
});

const generateDiverseInputsFlow = ai.defineFlow(
  {
    name: 'generateDiverseInputsFlow',
    inputSchema: DiverseInputsInputSchema,
    outputSchema: DiverseInputsOutputSchema,
  },
  async input => {
    const {output} = await generateDiverseInputsPrompt(input);
    return output!;
  }
);
