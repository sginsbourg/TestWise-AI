export type FeedbackType = 'Acceptable' | 'Needs Improvement' | 'Unacceptable';

export type TestLog = {
  id: string;
  input: string;
  output: string;
  feedback?: FeedbackType;
  assessment?: string;
  testScenario: string;
};
