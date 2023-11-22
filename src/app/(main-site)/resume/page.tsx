import Image from "next/image";
import { Metadata } from "next";
import ProfessionalProfile from "@/components/resume/professional-profile";
import EducationSection from "@/components/resume/education";
import JobTimeline from "@/components/resume/job-timeline";
import InternTimeline from "@/components/resume/intern-timeline";
import SkillsCertifications from "@/components/resume/certifications";
import SkillList from "@/components/resume/skills";

export const metadata: Metadata = {
  title: "Resume",
};

const headingClasses = " ";

export default function Page() {
  return <>
    <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
      <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

        <h1>Resume</h1>

        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <div className="basis-1/2 flex flex-row justify-evenly items-center">
            <Image src="/static/resume/tyler_latshaw_headshot.png" width={750} height={938} alt="Tyler Latshaw" className={"w-1/2 mx-auto border-solid border-8 border-black shadow-xl shadow-black/40"} id="tyler_latshaw_headshot" priority={true} />
          </div>

          <div className="basis-1/2 flex flex-row justify-evenly items-center">
            <div className="w-full">
              <h2 className={headingClasses}>Professional Profile</h2>
              <ProfessionalProfile />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className={headingClasses}>Education</h2>
          <EducationSection />
        </div>

        <div className="w-full">
          <h2 className={headingClasses}>Professional Projects & Presentations</h2>
        </div>

        <div className="w-full">
          <h2 className={headingClasses}>Skills</h2>
          <SkillList />
        </div>

        <div className="w-full">
          <h2 className={headingClasses}>Certifications</h2>
          <SkillsCertifications />
        </div>

        <div className="mx-auto w-full md:w-fit max-w-5xl">
          <h2 className={headingClasses}>Professional Experience</h2>
          <JobTimeline />
        </div>

        <div className="mx-auto w-full md:w-fit max-w-5xl">
          <h2 className={headingClasses}>Internship Experience</h2>
          <InternTimeline />
        </div>

        <div className="w-full">
          <h2 className={headingClasses}>Volunteer Work</h2>
        </div>

      </div>
    </div>
  </>;
}