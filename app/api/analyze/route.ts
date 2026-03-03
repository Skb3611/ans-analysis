import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("[v0] Missing GOOGLE_GENERATIVE_AI_API_KEY");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const {
      correctText,
      studentText,
      maxMarks,
      correctMarks,
      partialMarks,
      wrongMarks,
    } = body;

    if (!correctText || !studentText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      generationConfig: {
        temperature: 0,
        topP: 1,
        topK: 1,
      },
    });

    const prompt = `You are an expert exam evaluator. Compare the student answers against the correct answers and grade each question.

CORRECT ANSWERS:
${correctText}

STUDENT ANSWERS:
${studentText}

MARKING CRITERIA:
- Maximum marks per question: ${maxMarks}
- Marks for correct answer: ${correctMarks}
- Marks for partial answer: ${partialMarks}
- Marks for wrong answer: ${wrongMarks}

INSTRUCTIONS:
1. Identify each question (Q1, Q2, Q3, etc. format)
2. Compare student answer with correct answer
3. Evaluate if the answer is Correct, Partial, or Wrong
4. Assign marks according to the criteria
5. Provide constructive feedback
6. Extract the correct answer and student answer for each question
7.If the same input is provided again,the output must be identical.

Return ONLY a valid JSON object (no markdown, no extra text) in this exact format:
{
  "questions": [
    {
      "question": "Question text or Q1, Q2, etc",
      "correctAnswer": "The correct answer text",
      "studentAnswer": "The student's answer text",
      "marks": <number>,
      "maxMarks": ${maxMarks},
      "result": "Correct",
      "feedback": "Brief feedback"
    }
  ],
  "totalMarks": <total>
}`;


    const result = await model.generateContent(prompt);
    const responseText = result.response.text();


    // Parse JSON from response - look for JSON object
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[v0] No JSON found in response:", responseText);
      throw new Error("No JSON found in response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!analysis.questions || !Array.isArray(analysis.questions)) {
      throw new Error("Invalid response structure");
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("[v0] Analysis error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to analyze answers: ${errorMessage}` },
      { status: 500 },
    );
  }
}
