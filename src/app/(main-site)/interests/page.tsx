import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Interests',
}

export default function Page() {
  return <>
    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">

        <h1>Coming Soon</h1>

      </div>
    </div>
  </>
}