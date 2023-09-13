"use client";

import { useState } from "react";

export default function ComingSoonForm() {

    const [submitState, setSubmitState] = useState<number>(0); // 0 is neutral state/no response
    const [loadingState, setLoadingState] = useState<boolean>(false);

    async function submitForm(e: any) {
        e.preventDefault();
        setSubmitState(0);
        setLoadingState(true);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const name = `${formData.get("name")}`;
            const email = `${formData.get("email")}`;
            const message = `${formData.get("message")}`;
            const referringPage = `${window.location.href}`;
            const formSource = `${formData.get("source")}`;

            await fetch("/api/handle-coming-soon-form", {
                method: form.method,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    source: formSource,
                    referringPage: referringPage
                })
            });
            setSubmitState(1); // Success state
        } catch (e) {
            setSubmitState(2); // Error state
        }

        setLoadingState(false);
    }

    function GetResponse() {
        if (submitState === 1) {
            return "Got it! I'll notify you when the site goes live.";
        }

        if (submitState === 2) {
            return "Sorry, something went wrong.";
        }

        return "";
    }

    function GetResponseCssClass() {
        if (submitState === 1) {
            return "positive-response";
        }

        if (submitState === 2) {
            return "negative-response";
        }

        return "";
    }

    return <form className="w-full h-full" id="notify-me" method="post" onSubmit={submitForm}>
        <div className="w-fit mx-auto">
            <input type="text" name="name" id="name" className="hidden" defaultValue="Notification Request" hidden />
            <input type="text" name="message" id="message" className="hidden" defaultValue="Notify me when the site goes live" hidden />
            <input type="text" name="source" id="source" className="hidden" defaultValue="ComingSoon" hidden />
            <div className="w-full text-left">
                <div className="email-form mt-8">
                    <input type="email" name="email" id="email" placeholder="Email Address" className="px-3 py-2.5 mx-0 text-lg text-white bg-gray-700 rounded-l-lg border-0 h-full focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:w-48 md:w-60 lg:w-96 h-12" required disabled={loadingState} />

                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 mx-0 text-center h-full border-0 focus:ring-0 origin-center -translate-x-1 -translate-y-px" disabled={loadingState}>
                        {loadingState ? <>Submit&nbsp;<i className="fas fa-spinner animate-spin-slow"></i></> : <>Submit <i className="fas fa-arrow-circle-right"></i></>}
                    </button>
                </div>
                <span className={`flex px-3 py-1 text-left text-md ${GetResponseCssClass()}`}>{GetResponse()}</span>
            </div>
        </div>
    </form>;
}