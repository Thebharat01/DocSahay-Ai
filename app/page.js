"use client";

import { useRef, useState } from "react";
import { supabase } from "../lib/supabase/client";

export default function Home() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const handleUpload = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setMessage("");
    setResult("");
    setFile(null);

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage("❌ केवल PDF, JPG या PNG file upload करें।");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage("❌ File का size 10 MB से कम होना चाहिए।");
      return;
    }

    try {
      setUploading(true);
      setMessage("⏳ Document upload हो रहा है...");

      const fileName =
        `${Date.now()}-${selectedFile.name.replace(
          /[^a-zA-Z0-9.-]/g,
          "-"
        )}`;

      const { error } = await supabase.storage
        .from("Documents")
        .upload(fileName, selectedFile);

      if (error) {
        throw error;
      }

      setFile(selectedFile);
      setMessage("✅ Document successfully upload हो गया!");

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setMessage("❌ पहले कोई document upload करें।");
      return;
    }

    try {
      setAnalyzing(true);
      setMessage("🤖 Gemini document को समझ रहा है...");
      setResult("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data.result);
      setMessage("✅ Document analysis complete!");

    } catch (error) {
      console.error(error);
      setMessage("❌ Analysis failed: " + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "#ffffff",
          padding: "40px 25px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          DocSahay AI
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          हर Document समझें, हर Form आसानी से भरें।
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleUpload}
          style={{ display: "none" }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || analyzing}
          style={{
            background:
              uploading || analyzing ? "#777" : "#111827",
            color: "#ffffff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor:
              uploading || analyzing
                ? "not-allowed"
                : "pointer",
          }}
        >
          {uploading
            ? "⏳ Uploading..."
            : "📄 Upload Document"}
        </button>

        {file && !uploading && (
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{
              display: "block",
              width: "100%",
              marginTop: "20px",
              background: analyzing ? "#777" : "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: analyzing
                ? "not-allowed"
                : "pointer",
            }}
          >
            {analyzing
              ? "🤖 Gemini Analyzing..."
              : "🤖 Gemini से Analyze करें"}
          </button>
        )}

        {message && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            {message}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              background: "#f8fafc",
              borderRadius: "15px",
              textAlign: "left",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "15px",
              }}
            >
              🤖 AI Analysis
            </h2>

            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {result}
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gap: "15px",
          }}
        >
          <div>📄 Document समझें — ₹9</div>
          <div>📝 Form Filling Guide — ₹19</div>
          <div>✍️ Application बनाएं — ₹19</div>
        </div>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#777",
          }}
        >
          PDF, JPG और PNG • Maximum 10 MB
        </p>
      </div>
    </main>
  );
}            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "⏳ Uploading..." : "📄 Upload Document"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gap: "15px",
          }}
        >
          <div>📄 Document समझें — ₹9</div>
          <div>📝 Form Filling Guide — ₹19</div>
          <div>✍️ Application बनाएं — ₹19</div>
        </div>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#777",
          }}
        >
          PDF, JPG और PNG • Maximum 10 MB
        </p>
      </div>
    </main>
  );
}
