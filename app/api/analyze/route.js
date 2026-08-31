import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "Document नहीं मिला।" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key configured नहीं है।" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64Data,
          },
        },
        {
          text: `
इस document को ध्यान से पढ़ें और हिंदी में सरल भाषा में समझाएं।

1. Document किस बारे में है?
2. इसमें मुख्य जानकारी क्या है?
3. अगर यह कोई सरकारी या official form है तो इसे कैसे भरना है?
4. कौन-कौन से महत्वपूर्ण fields हैं?
5. किन documents या information की जरूरत पड़ सकती है?
6. कोई महत्वपूर्ण तारीख, राशि या deadline हो तो बताएं।

उत्तर स्पष्ट headings और bullet points में दें।
          `,
        },
      ],
    });

    return Response.json({
      success: true,
      result: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        error: error.message || "Document analysis failed.",
      },
      { status: 500 }
    );
  }
}
