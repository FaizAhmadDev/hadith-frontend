import './globals.css'

export const metadata = {
  title: 'Hadith Explanation System',
  description: 'Search and understand hadiths from Sahih al-Bukhari and Sahih Muslim',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}