export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f7fb",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "700px",
        width: "100%",
        background: "#ffffff",
        padding: "40px 25px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{
          fontSize: "42px",
          marginBottom: "10px"
        }}>
          DocSahay AI
        </h1>

        <p style={{
          fontSize: "20px",
          color: "#555",
          marginBottom: "30px"
        }}>
          हर Document समझें, हर Form आसानी से भरें।
        </p>

        <button style={{
          background: "#111827",
          color: "#ffffff",
          border: "none",
          padding: "15px 30px",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer"
        }}>
          📄 Upload Document
        </button>

        <div style={{
          marginTop: "35px",
          display: "grid",
          gap: "15px"
        }}>
          <div>📄 Document समझें — ₹11</div>
          <div>📝 Form Filling Guide — ₹21</div>
          <div>✍️ Application बनाएं — ₹21</div>
        </div>
      </div>
    </main>
  );
}
