import ContactForm from "@/components/contact-me/contact-me-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
};

export default function Page() {
  return <>
    <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
      <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

        <h1>Send Me a Message</h1>

        <div className="w-full mx-auto">
          <div className="w-full md:w-1/2 mx-auto bg-gray-800 p-6 rounded-lg">
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  </>;
}