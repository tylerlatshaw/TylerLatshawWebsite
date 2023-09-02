import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function Page() {
  return (
    <div className="h-full">
      <h1>Hello, Next.js!</h1>
      <br />
    </div>
  )
}