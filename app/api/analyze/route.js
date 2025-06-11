import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    // Verify required environment variables
    if (!process.env.OPENAI_KEY) {
      throw new Error('OPENAI_KEY environment variable is not set');
    }
    if (!process.env.AZURE_ENDPOINT) {
      throw new Error('AZURE_ENDPOINT environment variable is not set');
    }

    // Parse and validate request body
    const requestBody = await request.json();
    if (!requestBody.testCategory || !requestBody.values) {
      return NextResponse.json(
        { error: 'Missing required fields: testCategory and values' },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
      baseURL: process.env.AZURE_ENDPOINT,
    });

    // Define test categories (moved here for API self-containment)
    const testCategories = {
      cbc: {
        name: "Complete Blood Count (CBC)",
        tests: {
          hemoglobin: { name: "Hemoglobin", min: 12, max: 16, unit: "g/dL" },
          // ... (include all your test categories here)
        }
      }
      // ... (include all other test categories)
    };

    // Validate test category exists
    if (!testCategories[requestBody.testCategory]) {
      return NextResponse.json(
        { error: 'Invalid test category' },
        { status: 400 }
      );
    }

    // Prepare the prompt
    const tests = testCategories[requestBody.testCategory].tests;
    const formattedResults = Object.keys(requestBody.values)
      .map(key => `${tests[key].name}: ${requestBody.values[key]} ${tests[key].unit}`)
      .join("\n");

    const prompt = `---
### 1. Test Analysis
- For each value:
- Status: Clearly state High/Normal/Low in bold (with 🔴 for low, 🟠 for high, 🟢 for normal)
- Biological Reason: One concise phrase (≤15 words)

### 2. Potential Diagnoses
- Criteria: Only list conditions directly linked to ALL abnormal values
- Prioritization: Rank top 3 most likely diagnoses
- Include brief rationale

### 3. Recommended Specialists
- Specificity: Name subspecialists
- Alignment: Pair each specialist with a diagnosis

Lab Results:
${formattedResults}
---
Response Guidelines:
- Use clear headings, bullet points
- Avoid redundant explanations
- Prioritize abnormalities first`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a medical expert providing test analysis." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    // Process response
    let aiResponse = response.choices[0].message.content
      .replace(/\*\*/g, "")
      .replace(/#/g, "")
      .trim();

    // Extract doctors list
    const doctorsList = [];
    const sections = aiResponse.split("\n\n");
    for (const section of sections) {
      const lines = section.split("\n");
      for (const line of lines) {
        const match = line.match(/-\s*([A-Za-z\s]+?ist)\b/);
        if (match) doctorsList.push(match[1].trim());
      }
    }

    return NextResponse.json({
      result: aiResponse,
      doctors: [...new Set(doctorsList)]
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}