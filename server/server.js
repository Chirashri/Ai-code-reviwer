require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;


/*
LANGUAGE DETECTION
*/

function detectLanguage(code){

  if(code.includes("console.log") || code.includes("let ") || code.includes("const "))
    return "JavaScript";

  if(code.includes("print(") || code.includes("def "))
    return "Python";

  if(code.includes("System.out.println") || code.includes("public static void main"))
    return "Java";

  if(code.includes("#include") || code.includes("printf"))
    return "C";

  if(code.includes("cout") || code.includes("std::"))
    return "C++";

  return "Unknown";
}



/*
AI CODE REVIEW
*/

app.post("/review", async (req, res) => {

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required"
    });
  }

  const language = detectLanguage(code);

  try {

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a senior software engineer reviewing code."
          },
          {
            role: "user",
            content: `Language: ${language}\nReview this code and give improvements, bugs, and best practices:\n\n${code}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      language: language,
      review: aiResponse.data.choices[0].message.content
    });

  } catch (error) {

    console.log("AI failed, using fallback rules");

    let suggestions = [];

    // JavaScript
    if(language === "JavaScript"){

      if(code.includes("var "))
        suggestions.push("Avoid using var. Use let or const.");

      if(code.includes("console.log"))
        suggestions.push("Remove console.log in production code.");

      if(code.includes("=="))
        suggestions.push("Use === instead of ==.");

    }

    // Python
    if(language === "Python"){

      if(code.includes("print("))
        suggestions.push("Use logging instead of print in production.");

      if(!code.includes(":"))
        suggestions.push("Possible missing colon in function or loop.");

    }

    // Java
    if(language === "Java"){

      if(code.includes("System.out.println"))
        suggestions.push("Avoid excessive System.out.println in production.");

    }

    // C
    if(language === "C"){

      if(code.includes("gets("))
        suggestions.push("Avoid using gets(), it is unsafe.");

    }

    // C++
    if(language === "C++"){

      if(code.includes("using namespace std"))
        suggestions.push("Avoid using 'using namespace std' in header files.");

    }

    if(suggestions.length === 0){
      suggestions.push("Code looks good. Add comments and error handling.");
    }

    res.json({
      success: true,
      language: language,
      review: suggestions.join("\n")
    });

  }

});


/*
AI CODE EXPLANATION
*/

app.post("/explain", async (req, res) => {

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required"
    });
  }

  const language = detectLanguage(code);

  try {

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Explain programming code clearly for beginners."
          },
          {
            role: "user",
            content: `Language: ${language}\nExplain this code:\n\n${code}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      language: language,
      explanation: aiResponse.data.choices[0].message.content
    });

  } catch (error) {

    let explanation = "";

    if(code.includes("console.log")){
      explanation += "console.log prints output to the console.\n";
    }

    if(code.includes("var")){
      explanation += "var declares a variable in JavaScript.\n";
    }

    if(code.includes("+")){
      explanation += "The + operator performs addition.\n";
    }

    if(explanation === ""){
      explanation = "This code performs basic programming operations.";
    }

    res.json({
      success: true,
      language: language,
      explanation: explanation
    });

  }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});