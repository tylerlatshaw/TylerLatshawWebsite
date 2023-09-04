import ContactForm from '@/components/contact-me-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Me',
}

export default function Page() {
  return <>
    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center w-full">

        <h1 className="mb-8 text-3xl leading-tight md:text-4xl font-bold text-center w-full">Send Me a Message!</h1>

        <div className="flex md:flex-cols-2 mx-auto w-full">
          <div className="w-full mx-auto">
            Coming Soon
          </div>

          <div className="w-full mx-auto text-white">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </>
}