# AI-Powered PDF Answer Sheet Evaluator

An intelligent web application that automates the evaluation of student answer sheets by comparing them against a provided answer key using Google's Gemini AI.

## 📖 Theory & Core Concepts

The project operates on the principle of **Automated Educational Assessment**. The core workflow involves:
1.  **Optical/Digital Text Extraction**: Converting unstructured PDF data into machine-readable text.
2.  **Semantic Comparison**: Using Large Language Models (LLMs) to understand the meaning behind student responses rather than simple keyword matching.
3.  **Deterministic Grading**: Applying strict marking criteria (max marks, partial credit) through AI-driven reasoning to ensure consistency across multiple evaluations.

## 🛠 Tech Stack

-   **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide React (Icons).
-   **UI Components**: Radix UI (Shadcn UI patterns).
-   **Backend**: Next.js API Routes (Node.js runtime).
-   **AI Integration**: Google Generative AI (Gemini 1.5 Flash).
-   **PDF Processing**: `unpdf` for text extraction.
-   **Animations**: Tailwind Animate (`tw-animate-css`).

## 📂 File Structure

```text
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # AI evaluation logic & prompt engineering
│   │   └── extract-pdf/route.ts  # PDF text extraction service
│   ├── analyze/page.tsx          # Upload & configuration interface
│   ├── results/page.tsx          # Detailed score breakdown & feedback view
│   ├── layout.tsx                # Global layout & fonts
│   └── page.tsx                  # Landing page with hero & features
├── components/
│   ├── landing/                  # Landing page sections (Hero, Features, etc.)
│   └── ui/                       # Reusable Radix-based UI components
├── public/
│   └── sample-data/              # JSON files for "Load Sample" functionality
└── lib/                          # Utility functions (shadcn/tailwind merge)
```

## 🚀 Key Implementation Details

### 🤖 AI Integration (Gemini AI)
The system uses the `gemini-flash-lite-latest` model. The integration is handled in `app/api/analyze/route.ts`. 
-   **Prompt Engineering**: A structured prompt instructs the AI to identify questions, compare semantic meaning, and return a strict JSON schema.
-   **Determinism**: `generationConfig` is set with `temperature: 0` to ensure that identical inputs yield identical grading results.

### 📄 PDF Formatting Requirements
For optimal AI extraction and evaluation, PDF documents should follow these structure guidelines:
-   **Question Numbering**: Each question must be clearly identified with a number (e.g., `Q1:`, `Question 1:`, or simply `1.`).
-   **Answer Prefix**: Student responses and the answer key should ideally use the `Answer:` prefix.
-   **Clear Spacing**: Each question-answer pair should be separated by a blank line.
-   **Structure Example**:
    ```text
    Q1: What is the capital of France?
    Answer: Paris

    Q2: Explain photosynthesis.
    Answer: Plants use sunlight, water, and CO2 to create oxygen and energy in the form of sugar.
    ```

## 🔄 Project Flow (End-to-End)
1.  **Landing**: User enters the landing page and navigates to the `/analyze` page.
2.  **Configuration**: User sets the **Marking Criteria** (Max Marks, Marks for Correct, Partial, and Wrong answers).
3.  **PDF Upload**: User uploads two PDF files: the **Answer Key** and the **Student Paper**.
4.  **Extraction**: The system sends the PDFs to the `/api/extract-pdf` endpoint, where `unpdf` extracts raw text.
5.  **Preview**: Extracted text is shown on the frontend for verification.
6.  **AI Analysis**: The system normalizes the text and sends it to `/api/analyze`. The Gemini AI compares the papers based on the defined criteria and returns a structured JSON result.
7.  **Results**: Results are stored in `sessionStorage` and the user is redirected to the `/results` page for a comprehensive score breakdown.

