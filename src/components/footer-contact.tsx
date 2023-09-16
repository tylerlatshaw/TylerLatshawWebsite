"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

type SubmitState = "Idle" | "Success" | "Error";
type ContactFormInputs = {
    name: string
    email: string
    message: string
};

export default function FormFooterContact() {

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<String>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful }
    } = useForm<ContactFormInputs>();

    const onSubmit: SubmitHandler<ContactFormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            const { data } = await axios.post("/api/handle-footer-contact-form", {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                source: "Footer",
                referringPage: window.location.href
            });

            setResponseMessage(data.message);
            setSubmitState("Success");
        } catch (e) {
            setResponseMessage("Something went wrong. Please try again.");
            setSubmitState("Error");
        }

        setLoadingState(false);
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                name: "",
                email: "",
                message: ""
            });
        }
    }, [formState, reset]);


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
        <form className="w-full mt-1 footer-contact-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-3 group">
                <input {...register("name")} type="text" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required disabled={loadingState} />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input {...register("email")} type="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required disabled={loadingState} />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <TextareaAutosize {...register("message")} className="footer-textarea block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" minRows={1} maxRows={4} placeholder=" " required disabled={loadingState} />
                <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
            </div>
            <div className="flex items-center">
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loadingState}>
                    <span className="flex items-center">
                        {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                    </span>
                </button>
                <span className={`pl-3 text-md  ${GetResponseCssClass()}`}>{responseMessage}</span>
            </div>
        </form >
    );
}
