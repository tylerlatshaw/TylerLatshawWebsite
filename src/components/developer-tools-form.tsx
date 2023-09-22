"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import { RequestJson } from "@/app/api/handle-dev-tools-form/route";

const emailPlaceholder = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

type SubmitState = "Idle" | "Success" | "Error";
export type TemplateOptions = "CS-OnList" | "CS-SiteLive" | "NewMessage" | "AutoReply";
type FormInputs = {
    selection: TemplateOptions
    formName: string
    email: string
    apiKey: string
    title: string
    name: string
    message: string
    source: string
    referringPage: string
};

interface TemplateSelection {
    value: TemplateOptions,
    text: string
}

const emailTemplate: TemplateSelection[] = [
    {
        value: "CS-OnList",
        text: "Coming Soon - On the List"
    },
    {
        value: "CS-SiteLive",
        text: "Coming Soon - Site is Live"
    },
    {
        value: "NewMessage",
        text: "New Message Received"
    },
    {
        value: "AutoReply",
        text: "Thank You Auto Reply"
    }
];

export default function DeveloperTools() {

    const {
        register,
        handleSubmit,
        watch,
    } = useForm<FormInputs>({
        defaultValues: {
            selection: "CS-OnList",
            email: emailPlaceholder
        }
    });

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<String>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const selectedTemplate = watch("selection");

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            var enteredKey = formData.apiKey;

            const { data } = await axios.post("/api/handle-dev-tools-form", {
                selection: selectedTemplate,
                formName: emailTemplate.find(emailTemplate => emailTemplate.value === selectedTemplate)?.text ?? "Email",
                apiKey: enteredKey,
                email: formData.email,
                name: formData.name,
                message: formData.message,
                source: "Dev Tools",
                referringPage: window.location.href
            } as RequestJson);

            if (data.status === "Error") {
                setSubmitState("Error");
            } else {
                setSubmitState("Success");
            }

            setResponseMessage(data.message);
        } catch (e) {
            setResponseMessage("Something went wrong. Please try again.");
            setSubmitState("Error");
        }

        setLoadingState(false);
    };

    function GetApiField() {
        return (
            <div className="relative w-full group">
                <input {...register("apiKey")} type="password" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                <label htmlFor="apiKey" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                    API Key
                </label>
            </div>
        );
    }

    function GetSelectedTemplateFields() {
        if (selectedTemplate === "AutoReply") {
            return (
                <>
                    <div className="relative w-full group">
                        <input {...register("name")} className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                        <label htmlFor="name" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                            Name
                        </label>
                    </div>
                    <div className="relative w-full group">
                        <TextareaAutosize {...register("message")} className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" minRows={1} maxRows={4} required disabled={loadingState} />
                        <label htmlFor="message" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                            Message
                        </label>
                    </div>
                </>
            );
        }

        if (selectedTemplate === "CS-OnList") { return; }

        if (selectedTemplate === "CS-SiteLive") { return; }

        if (selectedTemplate === "NewMessage") {
            return (
                <>
                    <div className="relative w-full group">
                        <input {...register("name")} className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                        <label htmlFor="name" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                            Name
                        </label>
                    </div>
                    <div className="relative w-full group">
                        <TextareaAutosize {...register("message")} className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" minRows={1} maxRows={4} required disabled={loadingState} />
                        <label htmlFor="message" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                            Message
                        </label>
                    </div>
                </>
            );
        }

        return;
    }

    function GetResponseCssClass() {
        if (submitState === "Success") {
            return "positive-response";
        }

        if (submitState === "Error") {
            return "negative-response";
        }

        return "";
    }

    return (
        <>
            <form className="flex flex-wrap w-full mt-1 developer-tools-form gap-8" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full group">
                    <label className="flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600" htmlFor="radioButtons">Email Template</label>
                    <div className="flex flex-wrap gap-2" id="radioButtons">
                        {emailTemplate.sort((a, b) => a.text.localeCompare(b.text)).map((button) =>
                            <div key={button.value}>
                                <input {...register("selection")} id={button.value} value={button.value} type="radio" className="hidden peer" required disabled={loadingState} />
                                <label htmlFor={button.value} className="flex items-center w-full px-5 py-3 rounded-lg cursor-pointer text-gray-200 bg-gray-800/75 border border-gray-200 hover:text-gray-300 hover:bg-gray-900/60 hover:border-gray-300 peer-checked:text-green-600 peer-checked:border-green-600">
                                    {button.text}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative w-full group">
                    <input {...register("email")} type="email" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                    <label htmlFor="email" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                        Send To
                    </label>
                </div>
                {GetApiField()}
                {GetSelectedTemplateFields()}
                <div className="flex items-center">
                    <Button type="submit" className="button text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loadingState}>
                        <span className="flex items-center">
                            {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                        </span>
                    </Button>
                </div>
                <span className={`flex items-center pl-3 text-md font-semibold ${GetResponseCssClass()}`}>{responseMessage}</span>
            </form >
        </>
    );
}
