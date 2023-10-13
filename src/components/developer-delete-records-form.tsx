"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import { RecordData } from "@/database/records";
import { RequestJson } from "@/app/api/dev-handle-delete-record/route";
import Select from "react-select";
import { DropdownItem, dropdownStyles } from "./developer-accordion";
import { components } from "react-select";
import noDataFound from "./no-data-found";

const environment = process.env.NODE_ENV;

type SubmitState = "Idle" | "Success" | "Error";

type FormInputs = {
    apiKey: string,
    record: DropdownItem,
};

export default function DeleteRecordsForm() {

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
    } = useForm<FormInputs>({});

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<String>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordData[]>([]);

    const recordOptions: DropdownItem[] = records.map((value) => ({
        value: value.RecordId,
        label: value.RecordName + " - " + value.ArtistName + " (ID: " + value.RecordId + ")",
    }));

    useEffect(() => {
        axios.get("/api/dev-get-record-data").then((response) => {
            setRecords(response.data);
        });
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            var enteredKey;
            var recordId = formData.record.value;
            var recordName = records.find((i) => i.RecordId === +recordId!)?.RecordName;

            if (environment === "development") {
                enteredKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
            } else {
                enteredKey = formData.apiKey;
            }

            const { data } = await axios.post("/api/dev-handle-delete-record", {
                apiKey: enteredKey,
                recordName: recordName,
                recordId: +formData.record.value!,
            } as RequestJson);

            if (data.status === "Error") {
                setSubmitState("Error");
            } else {
                setSubmitState("Success");
                reset();
                setValue("record", { value: undefined, label: undefined });
            }

            axios.get("/api/dev-get-record-data").then((response) => {
                setRecords(response.data);
            });

            setResponseMessage(data.message);
        } catch (e) {
            if (formData.record.value === undefined) {
                setResponseMessage("Please select a record to delete.");
            } else {
                setResponseMessage("Something went wrong. Please try again.");
            }
            setSubmitState("Error");
        }

        setLoadingState(false);
    };

    function GetApiField() {
        if (environment === "development") {
            return (
                <input {...register("apiKey")} type="password" className="hidden" />
            );
        }

        return (
            <div className="relative w-full group">
                <input {...register("apiKey")} type="password" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" maxLength={36} required disabled={loadingState} />
                <label htmlFor="apiKey" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                    API Key
                </label>
            </div>
        );
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
                {GetApiField()}
                <div className="relative w-full group">
                    <label htmlFor="record" className="flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600">
                        Record
                    </label>
                    <Controller name="record" control={control} rules={{ required: true }} render={({ field }) =>
                        <Select {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={loadingState ? [] : recordOptions} noOptionsMessage={() => noDataFound("record")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
                    } />
                </div>
                <div className="flex items-center">
                    <Button type="submit" className="button text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loadingState}>
                        <span className="flex items-center">
                            {loadingState ? <>Delete&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Delete&nbsp;<DeleteIcon className="text-lg flex items-center" /></>}
                        </span>
                    </Button>
                </div>
                <span className={`flex items-center pl-3 text-md font-semibold ${GetResponseCssClass()}`}>{responseMessage}</span>
            </form >
        </>
    );
}
