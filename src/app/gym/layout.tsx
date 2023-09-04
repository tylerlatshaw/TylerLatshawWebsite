import './../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://tylerlatshaw.com/'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | Tyler Latshaw',
    default: 'Gym Stats',
  },
  description: 'Tyler Latshaw is a professionally-certified Scrum Master with years of experience in project management, web design, leadership, and mentoring.',
  generator: 'Next.js',
  applicationName: 'Next.js',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Tyler Latshaw', url: 'https://tylerlatshaw.com/' }],
  creator: 'Tyler J. Latshaw',
  publisher: 'Tyler J. Latshaw',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <body className="leading-normal tracking-normal bg-cover bg-fixed min-h-screen" suppressHydrationWarning={true}>
        <main>
          {children}
        </main>
      </body>
    </>
  )
}