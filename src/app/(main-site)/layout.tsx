import './../globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://tylerlatshaw.com/'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: '%s | Tyler Latshaw',
    default: 'Tyler Latshaw | Technical Business Analyst and Scrum Master',
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
      <main>
        <Navigation />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}