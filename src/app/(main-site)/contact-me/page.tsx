import ContactForm from "@/components/contact-me-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
};

export default function Page() {
  return <>
    <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
      <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

        <h1 className="w-full mb-8 text-3xl md:text-4xl font-bold text-center">Send Me a Message!</h1>

        <div className="w-full flex flex-col md:flex-row mx-auto">

          <div className="w-full mx-auto order-2 md:order-1">
            Coming Soon
          </div>

          <div className="w-full mx-auto text-white order-1 md:order-2">
            <ContactForm />
          </div>
          
        </div>

      </div>
    </div>
  </>;
}