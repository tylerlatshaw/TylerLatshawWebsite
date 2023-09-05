import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sitemap',
}

export default function Page() {
  return <>
    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">

        <h1>This is my sitemap</h1>

      </div>
    </div>
  </>
}