import { Client } from "@gradio/client";



export async function summarizeText(req, res) {
  const { text } = req.body;
  
  console.log("1. AI Controller received text:", text?.substring(0, 20) + "...");

  try {
    // Connect to the PyCharm script
    const client = await Client.connect("http://127.0.0.1:7860/");
    console.log("2. Connected to Gradio successfully");

    // This is the part that usually fails
    // We use .predict() and pass the data in an array [text] 
    // because that's how Gradio's simple Interface works
    const result = await client.predict(0, [ text ]); 
    
    console.log("3. AI Result received:", result.data[0]);

    res.json({ summary: result.data[0] });
  } catch (error) {
    // If anything fails, this WILL now show in your terminal
    console.error("--- AI ERROR DETECTED ---");
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
}