export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const useSampleData = formData.get("useSampleData") === "true";

    // Support loading sample data for testing
    if (useSampleData) {
      const sampleType = formData.get("sampleType") as string;
      const sampleFile =
        sampleType === "student" ? "student-answers.json" : "answer-key.json";

      try {
        const url = process.env.URL || "http://localhost:3000";
        console.log(`${url}/sample-data/${sampleFile}`);
        const response = await fetch(
          `${url}/sample-data/${sampleFile}`,
        );
        console.log("Sample Data Response:", response);
        const data = await response.json();

        // Convert JSON data to readable text format
        let textContent = "";

        if (typeof data === "object" && data !== null) {
          const lines: string[] = [];

          // Add title if exists
          if (data.title) {
            lines.push(`${data.title}\n`);
          }

          // Add student info if exists
          if (data.studentName) {
            lines.push(`Student: ${data.studentName}`);
          }
          if (data.studentID) {
            lines.push(`Student ID: ${data.studentID}`);
          }

          // Format questions
          if (Array.isArray(data.questions)) {
            lines.push("\n--- Questions and Answers ---\n");
            data.questions.forEach((q: any) => {
              lines.push(`Q${q.number}: ${q.text}`);
              lines.push(`Answer: ${q.answer}`);
              lines.push("");
            });
          }

          textContent = lines.join("\n");
        } else {
          textContent = String(data);
        }

        return NextResponse.json({ text: textContent });
      } catch (error) {
        console.error("Sample data loading error:", error);
        return NextResponse.json(
          { error: "Failed to load sample data" },
          { status: 500 },
        );
      }
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files allowed" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    const { text } = await extractText(arrayBuffer);
    console.log("Extracted Text:", text);

    if (!text || text.length === 0) {
      return NextResponse.json(
        { error: "No text found in PDF" },
        { status: 400 },
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("PDF extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract PDF text" },
      { status: 500 },
    );
  }
}
