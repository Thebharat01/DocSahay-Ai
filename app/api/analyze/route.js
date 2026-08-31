import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const service = formData.get("service");

    if (!file) {
      return Response.json(
        { error: "Document नहीं मिला।" },
        { status: 400 }
      );
    }

    if (!service) {
      return Response.json(
        { error: "Service select नहीं की गई।" },
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

    let prompt = "";

    if (service === "understand") {
      prompt = `
इस document को ध्यान से पढ़ें और आसान हिंदी में समझाएं।

इन headings के साथ जवाब दें:

1. 📄 Document क्या है?
2. 🔍 मुख्य जानकारी
3. 📌 महत्वपूर्ण बातें
4. 📅 महत्वपूर्ण तारीखें
5. 💰 राशि/Fees, अगर मौजूद हो
6. 📑 जरूरी documents
7. ✅ User को आगे क्या करना चाहिए?

जानकारी केवल document में उपलब्ध सामग्री के आधार पर दें।
जहाँ जानकारी उपलब्ध नहीं है वहाँ अनुमान न लगाएं।
      `;
    }

    if (service === "form") {
      prompt = `
यह एक form/document है। इसे ध्यान से पढ़कर हिंदी में Form Filling Guide बनाएं।

बताएं:

1. 📝 Form का उद्देश्य
2. 👤 Applicant की कौन-कौन सी जानकारी चाहिए
3. प्रत्येक महत्वपूर्ण field में क्या भरना है
4. कौन-कौन से documents लगाने हैं
5. कहाँ signature करना है
6. कौन सी जानकारी भरते समय सावधानी रखें
7. Submit करने से पहले final checklist

यदि कोई field document में दिखाई नहीं देती है तो उसे invent न करें।
      `;
    }

    if (service === "application") {
      prompt = `
इस document को ध्यान से पढ़ें और उपलब्ध जानकारी के आधार पर एक professional application/draft तैयार करें।

Application में:

- उचित विषय (Subject)
- सम्मानजनक संबोधन
- समस्या/अनुरोध का स्पष्ट विवरण
- उपलब्ध relevant details
- आवश्यक request
- उचित closing
- Applicant के लिए खाली fields जहाँ व्यक्तिगत जानकारी उपलब्ध नहीं है

Application सरल और professional हिंदी में हो।

Document में उपलब्ध जानकारी के बाहर कोई तथ्य invent न करें।
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64Data,
          },
        },
        {
          text: prompt,
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
        error:
          error.message ||
          "Document analysis failed.",
      },
      { status: 500 }
    );
  }
}
