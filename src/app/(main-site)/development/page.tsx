import { Metadata } from "next";
import DeveloperTools from "@/components/developer-tools-form";

export const metadata: Metadata = {
  title: "Developer Tools",
};

export default function Page() {
  return <>
    <meta name="robots" content="noindex,nofollow" />

    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">

        <h1 className="w-full text-center text-3xl md:text-4xl font-bold">Developer Tools</h1>

        <div className="w-full mt-8">
          <div className="flex p-8 sm:w-1/2 bg-gray-800/75 m-auto rounded-md">
            <DeveloperTools />
          </div>
        </div>

      </div>
    </div>
  </>;
}