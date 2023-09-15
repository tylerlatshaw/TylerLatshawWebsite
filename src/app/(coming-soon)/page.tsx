import Image from "next/image";
import Logo from "@/assets/images/gradient-logo-animated.svg";
import ComingSoonForm from "./components/coming-soon-form";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-full fixed absolute top-0 left-0 z-50">
      <div className="absolute top-[5%] sm:top-[10%] text-center w-full">
        <div className="w-fit mx-auto">
          <Image src={Logo} height={1} width={1} alt="Tyler Latshaw animated logo" className="w-[90%] sm:w-[600px] h-fit mx-auto" />
        </div>
      </div>

      <div className="absolute top-[20%] sm:top-1/3 text-center w-full">
        <div className="grid md:grid-cols-2">

          <div className="flex flex-col w-full md:border-r-2 border-gray-700 py-10">

            <h1 className="mx-auto leading-tight text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center">
              Big things<br />are<br />coming soon!
            </h1>

          </div>

          <div className="mt-3 mb-0 mx-auto w-full py-10">

            <div className="h-full flex flex-col">

              <h1 className="text-xl leading-tight md:text-3xl text-white font-bold text-center">
                Be the first to know when<br />the new site goes live
              </h1>

              <ComingSoonForm />

            </div>

          </div>
        </div>
      </div>

      <div className="absolute content-start w-full mx-auto py-6 top-3/4 text-gray-400">
        <div className="grid justify-center">
          <div className="mt-6">
            <a href="mailto:tyler@tylerlatshaw.com" className="group block" target="_blank">
              <div className="flex items-center">
                <MailOutlineIcon className="group-hover:text-green-500" />&nbsp;
                <h3 className="group-hover:text-green-500">tyler@tylerlatshaw.com</h3>
              </div>
            </a>
          </div>
        </div>
        <div className="grid justify-center">
          <div className="mt-3">
            <a href="https://www.linkedin.com/in/tylerlatshaw/" className="group block" target="_blank">
              <div className="flex items-center">
                <LinkedInIcon className="group-hover:text-green-500" />&nbsp;
                <h3 className="group-hover:text-green-500">Connect With Me On LinkedIn</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
