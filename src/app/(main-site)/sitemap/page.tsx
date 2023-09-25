import { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Sitemap",
};

export default function Page() {
  return <>
    <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
      <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

        <h1 className="w-full mb-8 text-3xl md:text-4xl font-bold text-center">Sitemap</h1>

      </div>
    </div>
  </>;
}