import PrivacyPolicy from '@/components/privacy-policy'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function Page() {
  return <>
    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container flex pt-24 md:pt-36 mx-auto block text-md">
        <PrivacyPolicy />
      </div>
    </div>
  </>
}