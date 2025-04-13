import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

export async function POST(request) {
  const token = process.env.NEXT_PUBLIC_AZURE_KEY; // Use Azure credentials, not GitHub token

  try {
    const client = ModelClient(
      "https://your-azure-endpoint.openai.azure.com/", // Your Azure endpoint
      new AzureKeyCredential(token)
    );

    const { messages } = await request.json();

    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        model: "gpt-4o", // Use your deployed model name
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
      }
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message);
    }

    return Response.json({
      content: response.body.choices[0].message.content
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
