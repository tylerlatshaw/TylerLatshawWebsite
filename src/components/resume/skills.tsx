"use client";

import { skills } from "@/app/lib/resume-data";
import { Chip } from "@mui/material";

export default function SkillList() {

    return (
        <>
            <div className="flex flex-row flex-wrap gap-3 w-full mx-3">
                {
                    skills.map((skill) =>
                        <Chip key={skill} label={skill} className="text-white bg-gray-700 font-normal text-base tracking-wide px-1 shadow-md shadow-gray-900" />
                    )
                }
            </div>
        </>
    );
}