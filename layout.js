export const metadata = {
  title: "DocSahay AI",
  description:
    "AI-powered document and form assistant. Documents समझें, forms भरें और applications बनाएं।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
