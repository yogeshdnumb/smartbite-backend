import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("No API Key");
}

const genAi = new GoogleGenerativeAI(API_KEY);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `give the output as json with the food's name,the nutrients contained in it,it's benefits,calories and allergies without backticks json using this format { "name": "", "calories": "", "nutrients": [], "benefits": [], "allergies": [] } `,
});

async function getAiResponse(
  prompt: string,
  imgBuffer: Buffer,
  mimeType: string
) {
  const result = await model.generateContent([
    prompt,
    {
      inlineData: { data: Buffer.from(imgBuffer).toString("base64"), mimeType },
    },
  ]);
  const text = result.response.text();
  return text;
}

export async function getImgInfo(imgBuffer: Buffer, mimeType: string) {
  const result = await getAiResponse("what is this?", imgBuffer, mimeType);
  // return JSON.parse(result.slice(7, -3)).calories;
  // console.log(JSON.parse(result));
  return JSON.parse(result);
}
