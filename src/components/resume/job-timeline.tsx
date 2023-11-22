"use client";

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { Avatar } from "@material-tailwind/react";

import { companyData, jobData } from "../../app/lib/resume-data";

export default function CustomizedTimeline() {

    function renderTimeline() {

        return jobData.map((company) =>
            <div key={company.company}>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineConnector className="h-5 grow-0" />
                        <TimelineDot className="w-12 h-12 border-0 p-0 bg-transparent">
                            <Avatar src={companyData.find((value) => value.company === company.company)?.logo} className="w-12 h-12 m-0 p-0 border-2 border-white rounded-full" />
                        </TimelineDot>
                        <TimelineConnector className="grow" />
                    </TimelineSeparator>

                    <TimelineContent className="mt-6 mb-0 pl-6 pr-2">
                        <Typography component="span" className="text-2xl font-medium">
                            {companyData.find((value) => value.company === company.company)?.company}
                        </Typography>
                        <br />
                        <Typography component="p" className="text-md text-gray-300">
                            {companyData.find((value) => value.company === company.company)?.location}
                        </Typography>
                    </TimelineContent>
                </TimelineItem>

                {
                    company.jobData.map((job) =>
                        <div key={job.jobTitle}>
                            <TimelineItem className="ml-[18px]">
                                <TimelineSeparator>
                                    <TimelineConnector className="h-6 grow-0" />
                                    <TimelineDot className="bg-white w-3 h-3 border-0 p-0" />
                                    <TimelineConnector className="grow" />
                                </TimelineSeparator>

                                <TimelineContent className="mt-[23px] mb-0 pl-11 pr-6">
                                    <div>
                                        <Typography component="span" className="text-lg font-medium">
                                            {
                                                job.jobTitle
                                            }
                                        </Typography>
                                        &nbsp;
                                        <Typography component="span" className="text-lg italic text-gray-300">
                                            <span className="desktop-only">
                                                -
                                            </span>
                                            <br className="mobile-only" />
                                            {
                                                job.startDate.toLocaleString("en-US", { month: "short", year: "numeric" })} - {job.endDate === null ? "Present" : job.endDate.toLocaleString("en-US", { month: "short", year: "numeric" })
                                            }
                                        </Typography>
                                    </div>
                                    {
                                        job.previousTitle !== null ? job.previousTitle.map((title) =>
                                            <div key={title.jobTitle}>
                                                <Typography component="span" className="text-md font-light">
                                                    {
                                                        title.jobTitle
                                                    }
                                                </Typography>
                                                &nbsp;
                                                <Typography component="span" className="text-md font-light italic text-gray-300">
                                                    <span className="desktop-only">
                                                        -
                                                    </span>
                                                    <br className="mobile-only" />
                                                    {
                                                        title.startDate.toLocaleString("en-US", { month: "short", year: "numeric" })} - {title.endDate === null ? "Present" : title.endDate.toLocaleString("en-US", { month: "short", year: "numeric" })
                                                    }
                                                </Typography>
                                            </div>
                                        ) : null
                                    }
                                    <Typography component="p" className="mt-2 multiline">
                                        {
                                            job.jobDetails.map((detail) =>
                                                <ul key={detail} className="list-disc ml-6">
                                                    <li>{detail}</li>
                                                </ul>
                                            )
                                        }
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
            },
        }} className="p-0 md:p-4">

            {renderTimeline()}

        </Timeline>
    );
}