import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SirensForge.vip — Empire of the Deep',
  description: 'Empire of the Deep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}