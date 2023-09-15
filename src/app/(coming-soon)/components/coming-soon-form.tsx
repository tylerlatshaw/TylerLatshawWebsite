"use client";

import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SubmitState = "Idle" | "Success" | "Error";
type ComingSoonFormInputs = {
    email: string
};

export default function ComingSoonForm() {

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<String>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const {
        register,
        handleSubmit
    } = useForm<ComingSoonFormInputs>();

    const onSubmit: SubmitHandler<ComingSoonFormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            const { data } = await axios.post("/api/handle-coming-soon-form", {
                name: "Notification Request",
                email: formData.email,
                message: "Notify me when the site goes live",
                source: "Coming Soon",
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
        <form className="w-full h-full" id="notify-me" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-fit mx-auto">
                <div className="w-full text-left">
                    <div className="email-form mt-8">
                        <input {...register("email")} type="email" placeholder="Email Address" className="px-3 py-2.5 mx-0 text-lg text-white bg-gray-700 rounded-l-lg border-0 h-full focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:w-48 md:w-60 lg:w-96 h-12" required disabled={loadingState} />
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 mx-0 text-center h-full border-0 focus:ring-0 origin-center -translate-x-1 -translate-y-px" disabled={loadingState}>
                            {loadingState ? <>Submit&nbsp;<i className="fas fa-spinner animate-spin-slow"></i></> : <>Submit <i className="fas fa-arrow-circle-right"></i></>}
                        </button>
                    </div>
                    <span className={`flex px-3 py-1 text-left text-md ${GetResponseCssClass()}`}>{responseMessage}</span>
                </div>
            </div>
        </form>
    );
}