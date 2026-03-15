import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeEditor(){

  const [code,setCode] = useState("");
  const [review,setReview] = useState("");
  const [explanation,setExplanation] = useState("");
  const [language,setLanguage] = useState("");
  const [loading,setLoading] = useState(false);

  const reviewCode = async () => {

    setLoading(true);

    try{
      const res = await axios.post(
        "http://localhost:5000/review",
        { code }
      );

      setReview(res.data.review);
      setLanguage(res.data.language || "Unknown");

    }catch(error){
      console.error(error);
      setReview("Server error");
    }

    setLoading(false);
  };

  const explainCode = async () => {

    setLoading(true);

    try{
      const res = await axios.post(
        "http://localhost:5000/explain",
        { code }
      );

      setExplanation(res.data.explanation);
      setLanguage(res.data.language || "Unknown");

    }catch(error){
      console.error(error);
      setExplanation("Server error");
    }

    setLoading(false);
  };

  const renderAIResponse = (text) => {

    if(!text) return null;

    const parts = text.split("```");

    return parts.map((part,index)=>{

      if(index % 2 === 1){
        return (
          <SyntaxHighlighter
            key={index}
            language="javascript"
            style={oneDark}
          >
            {part}
          </SyntaxHighlighter>
        );
      }

      return (
        <p key={index} style={{whiteSpace:"pre-wrap"}}>
          {part}
        </p>
      );

    });

  };

  const calculateScore = (text) => {

    if(!text) return null;

    let score = 10;

    if(text.includes("Avoid using var")) score--;
    if(text.includes("console.log")) score--;
    if(text.includes("error")) score--;

    return score;

  };

  const resetEditor = () => {

    setCode("");
    setReview("");
    setExplanation("");
    setLanguage("");

  };

  return(

    <div style={styles.page}>

      <video autoPlay loop muted playsInline style={styles.videoBg}>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div style={styles.content}>

        <h1 style={styles.title}>AI Code Reviewer</h1>

        {language && (
          <div style={styles.badge}>
            Detected Language: {language}
          </div>
        )}

        <div style={styles.editorBox}>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            theme="neonTheme"
            value={code}
            onChange={(value)=>setCode(value)}

            beforeMount={(monaco) => {

              monaco.editor.defineTheme("neonTheme",{
                base:"vs-dark",
                inherit:true,
                rules:[
                  { token:"comment", foreground:"00ff9c" },
                  { token:"keyword", foreground:"00ffea" },
                  { token:"string", foreground:"8affc1" },
                  { token:"number", foreground:"00ffd0" },
                  { token:"type", foreground:"00ffea" }
                ],
                colors:{
                  "editor.background":"#020c0c",
                  "editor.foreground":"#00ff9c",
                  "editorCursor.foreground":"#00ff9c",
                  "editor.lineHighlightBackground":"#002222",
                  "editorLineNumber.foreground":"#00aa88",
                  "editor.selectionBackground":"#003f3f"
                }

              });

            }}

          />
        </div>

        <div style={styles.buttons}>

          <button style={styles.reviewBtn} onClick={reviewCode}>
            Review Code
          </button>

          <button style={styles.explainBtn} onClick={explainCode}>
            Explain Code
          </button>

          <button style={styles.resetBtn} onClick={resetEditor}>
            Refresh
          </button>

        </div>

        <div style={styles.resultContainer}>

          <div style={styles.suggestionCard}>

            <h3 style={styles.cardTitle}>💡 Suggestions</h3>

            {review && (
              <p style={styles.score}>
                Code Quality Score: {calculateScore(review)}/10
              </p>
            )}

            {review && (
              <button
                style={styles.copyBtn}
                onClick={()=>navigator.clipboard.writeText(review)}
              >
                Copy Review
              </button>
            )}

            <div style={styles.resultContent}>
              {loading ? "🤖 AI analyzing your code..." : renderAIResponse(review)}
            </div>

          </div>

          <div style={styles.explanationCard}>

            <h3 style={styles.cardTitle}>📘 Explanation</h3>

            <div style={styles.resultContent}>
              {loading ? "🤖 AI analyzing your code..." : renderAIResponse(explanation)}
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    width:"100%",
    position:"relative",
    overflow:"hidden",
    fontFamily:"Arial"
  },

  videoBg:{
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    objectFit:"cover",
    zIndex:-1
  },

  content:{
    position:"relative",
    zIndex:2,
    padding:"40px",
    color:"white"
  },

  title:{
    textAlign:"center",
    color:"#eafff6",
    marginBottom:"20px",
    textShadow:"0 0 10px rgba(0,255,150,0.6)"
  },

  badge:{
    textAlign:"center",
    marginBottom:"15px",
    background:"rgba(0,0,0,0.7)",
    color:"#00ff9c",
    padding:"10px 16px",
    borderRadius:"20px",
    width:"260px",
    marginLeft:"auto",
    marginRight:"auto",
    fontWeight:"bold",
    border:"1px solid rgba(0,255,120,0.4)"
  },

  editorBox:{
    borderRadius:"10px",
    overflow:"hidden",
    border:"1px solid rgba(0,255,150,0.4)",
    boxShadow:"0 0 20px rgba(0,255,150,0.35)"
  },

  buttons:{
    textAlign:"center",
    marginTop:"20px"
  },

  reviewBtn:{
    padding:"12px 26px",
    marginRight:"10px",
    background:"linear-gradient(135deg,#00c853,#69f0ae)",
    color:"white",
    border:"none",
    borderRadius:"10px",
    fontSize:"16px",
    cursor:"pointer"
  },

  explainBtn:{
    padding:"12px 26px",
    background:"linear-gradient(135deg,#ff7a18,#ffb347)",
    color:"white",
    border:"none",
    borderRadius:"10px",
    fontSize:"16px",
    cursor:"pointer"
  },

  resetBtn:{
    padding:"12px 26px",
    marginLeft:"10px",
    background:"linear-gradient(135deg,#ff416c,#ff4b2b)",
    color:"white",
    border:"none",
    borderRadius:"10px",
    fontSize:"16px",
    cursor:"pointer"
  },

  resultContainer:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:"20px",
    marginTop:"25px"
  },

  suggestionCard:{
    background:"rgba(0,0,0,0.65)",
    backdropFilter:"blur(12px)",
    border:"1px solid rgba(0,255,120,0.3)",
    color:"#00ff9c",
    borderRadius:"14px",
    padding:"20px",
    boxShadow:"0 0 15px rgba(0,255,120,0.25)"
  },

  explanationCard:{
    background:"rgba(0,0,0,0.65)",
    backdropFilter:"blur(12px)",
    border:"1px solid rgba(0,255,120,0.3)",
    color:"#9cffc7",
    borderRadius:"14px",
    padding:"20px",
    boxShadow:"0 0 15px rgba(0,255,120,0.25)"
  },

  cardTitle:{
    marginBottom:"12px",
    fontSize:"18px",
    fontWeight:"bold"
  },

  score:{
    color:"#00ff9c",
    marginBottom:"10px"
  },

  copyBtn:{
    padding:"6px 12px",
    marginBottom:"10px",
    background:"#00ff9c",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  resultContent:{
    background:"rgba(0,0,0,0.75)",
    color:"#c8ffe5",
    borderRadius:"12px",
    padding:"18px",
    maxHeight:"260px",
    overflowY:"auto",
    fontFamily:"'JetBrains Mono', monospace"
  }

};

export default CodeEditor;