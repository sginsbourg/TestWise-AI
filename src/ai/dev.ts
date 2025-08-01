import { config } from 'dotenv';
config();

import '@/ai/flows/generate-diverse-inputs.ts';
import '@/ai/flows/qualitative-feedback.ts';
import '@/ai/flows/summarize-log-file.ts';
import '@/ai/flows/summarize-test-patterns.ts';
import '@/ai/flows/provide-qualitative-feedback.ts';