const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  try {
    // 从网页请求中获取 prompt 和 modelName
    const { prompt, modelName } = req.body;

    // 使用网页传过来的模型名称，如果没有传，默认用 gemini-3-flash-preview
    const model = genAI.getGenerativeModel({ model: modelName || "gemini-3-flash-preview" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}