
export type DocItem = {
  label: string;
  tooltip: string;
};

export type DocCategory = {
  title: string;
  description: string;
  [key: string]: string | DocItem | any;
};

export const documentation = {
  general: {
    title: "About TestWise AI",
    description: "TestWise AI is a comprehensive suite of tools designed to streamline and enhance the process of testing artificial intelligence models. At its core, this application provides developers and QA professionals with the means to systematically evaluate AI behavior, identify weaknesses, and ensure robustness. By offering features for diverse input generation, detailed logging, qualitative feedback, and automated pattern recognition, TestWise AI aims to foster a rigorous and efficient testing culture, ultimately leading to more reliable and trustworthy AI systems."
  },
  inputGenerator: {
    title: "Diverse Input Generator",
    description: "This tool uses an AI to generate a variety of test inputs based on your model's description. It helps you explore edge cases, common scenarios, and potential failure points automatically. A good description leads to more relevant and effective test inputs.",
    modelDescription: {
      label: "Model Description",
      tooltip: "Clearly describe the AI model you want to test, including its purpose and expected input types. A good description leads to more relevant and effective test inputs."
    },
    numberOfInputs: {
      label: "Number of Inputs",
      tooltip: "Select the number of distinct test inputs you want the AI to generate. You can choose between 1 and 10 inputs per generation."
    },
    generateButton: {
      label: "Generate Inputs Button",
      tooltip: "Click here to trigger the AI-powered input generation. The generated inputs will appear below, ready to be copied and used for testing."
    },
    copyButton: {
      label: "Copy Button",
      tooltip: "Copy this input to your clipboard. You can then paste it into the 'AI Model Tester' to run a test."
    }
  },
  modelTester: {
    title: "AI Model Tester",
    description: "Manually test your AI model with specific inputs and scenarios. This allows for targeted testing of known problem areas or new use cases. The results will be added to the Test Logs for analysis.",
    testScenario: {
      label: "Test Scenario",
      tooltip: "Describe the context for this test. For example, 'Testing a sarcastic comment' or 'Testing a long sentence'. This helps when analyzing the results later."
    },
    inputForModel: {
      label: "Input for Model",
      tooltip: "Enter the exact text you want to send to the AI model for this test case. You can paste inputs from the generator or write your own."
    },
    runTestButton: {
      label: "Run Test Button",
      tooltip: "Execute the test with the provided scenario and input. A new log entry will be created with the model's output, which you can then provide feedback on."
    }
  },
  logSummarizer: {
    title: "Automated Log Summarizer",
    description: "This feature uses AI to analyze all of your test logs. It automatically identifies and summarizes recurring failure patterns, helping you quickly pinpoint your model's weaknesses and prioritize areas for improvement.",
    summarizeButton: {
      label: "Summarize Test Logs Button",
      tooltip: "Click this button to have an AI analyze all the test results from the log below. It will produce a summary highlighting common failure themes and potential issues."
    }
  },
  testLogger: {
    title: "Test Logs",
    description: "Review the results of each test. Provide qualitative feedback on the model's output, which helps generate a more accurate AI assessment of its performance and contributes to the automated log summary.",
    feedback: {
      acceptable: "The model output is correct and meets all expectations for the given scenario.",
      needsImprovement: "The output is partially correct or acceptable, but has minor issues or could be better.",
      unacceptable: "The output is incorrect, irrelevant, harmful, or otherwise a clear failure."
    },
    assessment: {
      label: "Qualitative Feedback Assessment",
      tooltip: "This is the AI's detailed analysis of the model's output, based on the feedback you provided. Click to expand and read the assessment."
    }
  }
};
