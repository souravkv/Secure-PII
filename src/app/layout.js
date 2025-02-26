import './globals.css'

export const metadata = {
  title: 'Secure PI! - Document Analysis',
  description: 'Secure document analysis for PII detection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}