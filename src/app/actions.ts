"use server";

import {
  generateDiverseInputs,
  type DiverseInputsInput,
} from '@/ai/flows/generate-diverse-inputs';
import {
  assessOutputQuality,
  type QualitativeFeedbackInput,
} from '@/ai/flows/qualitative-feedback';
import {
  summarizeLogFile,
  type SummarizeLogFileInput,
} from '@/ai/flows/summarize-log-file';

export const generateDiverseInputsAction = async (
  input: DiverseInputsInput
) => {
  try {
    const result = await generateDiverseInputs(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to generate inputs: ${errorMessage}` };
  }
};

export const assessOutputQualityAction = async (
  input: QualitativeFeedbackInput
) => {
  try {
    const result = await assessOutputQuality(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to assess quality: ${errorMessage}` };
  }
};

export const summarizeLogFileAction = async (
  input: SummarizeLogFileInput
) => {
  try {
    const result = await summarizeLogFile(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to summarize log file: ${errorMessage}` };
  }
};
