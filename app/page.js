"use client";

import { useRef, useState } from "react";
import { supabase } from "../lib/supabase/client";

export default function Home() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage("");

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("❌ केवल PDF, JPG या PNG file upload करें।");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("❌ File का size 10 MB से कम होना चाहिए।");
      return;
    }

    try {
      setUploading(true);
      setMessage("⏳ Document upload हो रहा है...");

      const fileName =
        `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

      const { error } = await supabase.storage
        .from("Documents")
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      setMessage("✅ Document successfully upload हो गया!");

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed: " + error.message);
    } finally {
      setUploading(false);
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
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
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
          disabled={uploading}
          style={{
            background: uploading ? "#777" : "#111827",
            color: "#ffffff",
            border: "none",
            padding: "15px 30px",
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
