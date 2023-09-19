import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";

export default function Page() {

  return <>
    <div className="h-full">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* Left column */}
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl leading-tight md:leading-tight md:text-5xl text-white font-bold text-center md:text-left">
            Hello! I&apos;m&nbsp;
            <span className="logo-first-name bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-pink-600 to-purple-500">Tyler</span>, a certified technical business analyst and trivia-lover.
          </h1>
          <p className="homepage-subtext leading-normal text-base text-green-500 md:text-xl mb-8 text-center md:text-left">
            *The certifications are for being a technical business analyst, not a trivia-lover.
          </p>

        </div>

        {/* Right column */}
        <div className="w-full xl:w-3/5 p-12">
          <Image src="/static/homepage-headshot.png" width={709} height={421} alt="Tyler Latshaw" className={"homepage-main-image mx-auto w-full md:w-4/5 transform -rotate-3 transition hover:scale-105 duration-700 ease-in-out hover:rotate-3 homepage-main-image-blue"} id="homepage-main-image" priority={true} />
        </div>
      </div>
    </div>

    {/* Main */}
    <div className="certification-ribbon mt-24 md:mt-36 mx-auto flex w-100 bg-white items-center">

      {/* Certification ribbon */}
      <div className="certification-ribbon w-100 my-3 grow max-w-screen-xl mx-auto overflow-x-auto">
        <div className="certification-ribbon mx-auto flex flex-row items-center w-100">
          <div className="flex-shrink-0 sm:grow px-6">
            <Image src="/static/cert-a-csm.svg" width={165} height={150} alt="A-CSM Logo" className="mx-auto certification-image align-middle" priority={false} />
          </div>
          <div className="flex-shrink-0 sm:grow px-6">
            <Image src="/static/cert-csm.svg" width={165} height={150} alt="CSM Logo" className="mx-auto certification-image align-middle" priority={false} />
          </div>
          <div className="flex-shrink-0 sm:grow px-6">
            <Image src="/static/cert-comptia.svg" width={180} height={150} alt="Comptia A+ Logo" className="mx-auto certification-image align-middle" priority={false} />
          </div>
          <div className="flex-shrink-0 sm:grow px-6">
            <Image src="/static/cert-cfsp.svg" width={300} height={89} alt="CFSP Logo" className="mx-auto certification-image align-middle" priority={false} />
          </div>
          <div className="flex-shrink-0 sm:grow px-6">
            <Image src="/static/cert-servsafe.svg" width={300} height={134} alt="ServSafe Logo" className="mx-auto certification-image align-middle" priority={false} />
          </div>
        </div>
      </div>

    </div>

    {/* Main */}
    <div className="container mt-12 md:mt-16 mb-16 md:pb-8 md:mb-28 mx-auto flex flex-wrap flex-col md:flex-row items-center">

      <h2 className="w-full text-center text-2xl leading-tight md:leading-tight md:text-4xl text-white font-bold">Get to Know Me</h2>

      <div className="w-full pb-12 md:pb-18">
        <div className="relative flex items-center mx-auto w-1/4 pt-4">
          <div className="flex-grow border-t border-white"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:gap-4 md:px-0 w-full text-center justify-items-center">
        {/* Left column */}
        <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
          <a href="#">
            <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Placeholder Image" className="rounded-t-lg" priority={false} />
          </a>
          <div className="p-5">
            <a href="#">
              <span className="uppercase font-semibold tracking-wide text-red-400 text-lg">Resume</span>
            </a>
            <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-300">
              Read more&nbsp;<SendIcon className="text-base flex items-center" />
            </a>
          </div>
        </div>

        {/* Middle column */}
        <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
          <a href="#">
            <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Placeholder Image" className="rounded-t-lg" priority={false} />
          </a>
          <div className="p-5">
            <a href="#">
              <span className="uppercase font-semibold tracking-wide text-red-400 text-lg">Resume</span>
            </a>
            <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-300">
              Read more&nbsp;<SendIcon className="text-base flex items-center" />
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
          <a href="#">
            <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Placeholder Image" className="rounded-t-lg" priority={false} />
          </a>
          <div className="p-5">
            <a href="#">
              <span className="uppercase font-semibold tracking-wide text-red-400 text-lg">Resume</span>
            </a>
            <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-300">
              Read more&nbsp;<SendIcon className="text-base flex items-center" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </>;
}