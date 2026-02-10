
import { GoogleGenAI, Type } from "@google/genai";
import { CODE_SNIPPETS } from "../constants";

export const scanCodeForVulnerabilities = async (code: string) => {
  try {
    // Initializing with process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze for cybersecurity vulnerabilities. Response in Arabic.\nCode:\n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  description: { type: Type.STRING },
                  fix: { type: Type.STRING }
                },
                required: ["type", "severity", "description", "fix"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["vulnerabilities", "summary"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Scan Error:", error);
    return {
      vulnerabilities: [],
      summary: "ÙØ´Ù Ø§ÙØ§ØªØµØ§Ù Ø¨ÙØ­Ø±Ù Ø§ÙØ°ÙØ§Ø¡ Ø§ÙØ§ØµØ·ÙØ§Ø¹Ù."
    };
  }
};

// Added scanHTTPRequest to resolve the export error in HTTPScanner.tsx
export const scanHTTPRequest = async (request: string) => {
  try {
    // Initializing with process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this raw HTTP request for cybersecurity vulnerabilities (SQLi, XSS, insecure headers, CSRF, etc.). Response in Arabic.\nRequest:\n${request}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  description: { type: Type.STRING },
                  fix: { type: Type.STRING }
                },
                required: ["type", "severity", "description", "fix"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["vulnerabilities", "summary"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini HTTP Scan Error:", error);
    return {
      vulnerabilities: [],
      summary: "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«ÙØ§Ø¡ ØªØ­ÙÙÙ Ø­Ø²Ù Ø§ÙØ¨ÙØ§ÙØ§Øª Ø¹Ø¨Ø± Ø§ÙØ°ÙØ§Ø¡ Ø§ÙØ§ØµØ·ÙØ§Ø¹Ù."
    };
  }
};
