import Footer from '../components/Footer'

export const metadata = {
  title: 'DocSahay-AI',
  description: 'AI-powered document assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
