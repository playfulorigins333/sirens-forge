import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// COMMENTED OUT: GitHubCorner — not needed for launch
// import GitHubCorner from '@/components/GitHubCorner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sirens Forge — Eternal Seat $29.99/mo',
  description: '120 Eternal Seats. Subscription. Live.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* COMMENTED OUT: GitHubCorner — not needed for launch */}
        {/* <GitHubCorner /> */}
        <div id="glare"></div>
        {children}
      </body>
    </html>
  )
}
