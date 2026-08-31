"use client";

import { useRef, useState } from "react";
import { supabase } from "../lib/supabase/client";

const services = [
  {
    id: "understand",
    icon: "📄",
    title: "Document समझें",
    price: "₹9",
    description: "किसी भी document को आसान हिंदी में समझें।",
  },
  {
    id: "form",
    icon: "📝",
    title: "Form Filling Guide",
    price: "₹19",
    description: "Form के हर field में क्या भरना है, जानें।",
  },
  {
    id: "application",
    icon: "✍️",
    title: "Application बनाएं",
    price: "₹19",
    description: "Document के आधार पर professional application बनाएं।",
  },
];

export default function Home() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
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

      if (error) throw error;

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
      setMessage("❌ पहले document upload करें।");
      return;
    }

    if (!selectedService) {
      setMessage("❌ पहले कोई service चुनें।");
      return;
    }

    try {
      setAnalyzing(true);
      setResult("");
      setMessage("🤖 Gemini आपका document तैयार कर रहा है...");

      const formData = new FormData();

      formData.append("file", file);
      formData.append("service", selectedService);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data.result);
      setMessage("✅ आपका AI result तैयार है!");
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
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "40px 25px",
            textAlign: "center",
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 10px",
            }}
          >
            🤖 DocSahay AI
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
              background: "#111827",
              color: "#fff",
              border: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {uploading ? "⏳ Uploading..." : "📄 Upload Document"}
          </button>

          {file && (
            <p
              style={{
                marginTop: "15px",
                color: "#16a34a",
                fontWeight: "bold",
              }}
            >
              📎 {file.name}
            </p>
          )}

          {message && (
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
              }}
            >
              {message}
            </p>
          )}
        </div>

        {file && !uploading && (
          <div style={{ marginTop: "25px" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              अपनी Service चुनें
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              {services.map((service) => {
                const selected =
                  selectedService === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() =>
                      setSelectedService(service.id)
                    }
                    style={{
                      textAlign: "left",
                      padding: "25px",
                      background: selected
                        ? "#eff6ff"
                        : "#ffffff",
                      border: selected
                        ? "2px solid #2563eb"
                        : "2px solid #e5e7eb",
                      borderRadius: "18px",
                      cursor: "pointer",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ fontSize: "35px" }}>
                      {service.icon}
                    </div>

                    <h3
                      style={{
                        margin: "12px 0 8px",
                        fontSize: "21px",
                        color: "#111827",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                        lineHeight: "1.5",
                      }}
                    >
                      {service.description}
                    </p>

                    <strong
                      style={{
                        fontSize: "20px",
                        color: "#2563eb",
                      }}
                    >
                      {service.price}
                    </strong>

                    {selected && (
                      <div
                        style={{
                          marginTop: "12px",
                          color: "#2563eb",
                          fontWeight: "bold",
                        }}
                      >
                        ✓ Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !selectedService}
              style={{
                display: "block",
                width: "100%",
                marginTop: "25px",
                padding: "17px",
                border: "none",
                borderRadius: "12px",
                background:
                  analyzing || !selectedService
                    ? "#9ca3af"
                    : "#2563eb",
                color: "#fff",
                fontSize: "19px",
                fontWeight: "bold",
                cursor:
                  analyzing || !selectedService
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {analyzing
                ? "🤖 AI Processing..."
                : "🤖 AI Result तैयार करें"}
            </button>
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "30px",
              background: "#ffffff",
              padding: "30px 25px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
            }}
          >
            <h2>🤖 AI Result</h2>

            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
                fontSize: "16px",
                color: "#333",
              }}
            >
              {result}
            </div>
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          PDF, JPG और PNG • Maximum 10 MB
        </p>
      </div>
    </main>
  );
}
