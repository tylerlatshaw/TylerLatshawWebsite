"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import { RecordDataType } from "@/app/lib/type-library";
import Select from "react-select";
import { DropdownItem, inputStyles, inputLabelStyles, dropdownLabelStyles, dropdownStyles } from "./dropdown-configuration";
import { components } from "react-select";
import noDataFound from "../global-components/no-data-found";

import type { DeleteRecordType } from "@/app/lib/type-library";

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
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordDataType[]>([]);

    const recordOptions: DropdownItem[] = records.map((value) => ({
        value: value.RecordId,
        label: value.RecordName + " - " + value.ArtistName + " (ID: " + value.RecordId + ")",
    }));

    useEffect(() => {
        axios.get("/api/get-record-data").then((response) => {
            setRecords(response.data);
        });
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            let enteredKey;
            const recordId = formData.record.value;
            const recordName = records.find((i) => i.RecordId === +recordId!)?.RecordName;

            if (environment === "development") {
                enteredKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
            } else {
                enteredKey = formData.apiKey;
            }

            const { data } = await axios.post("/api/delete-record", {
                apiKey: enteredKey,
                recordName: recordName,
                recordId: +formData.record.value!,
            } as DeleteRecordType);

            if (data.status !== "Ok") {
                setSubmitState("Error");
            } else {
                setSubmitState("Success");
                reset();
                setValue("record", { value: undefined, label: undefined });
            }

            axios.get("/api/get-record-data").then((response) => {
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
                <input {...register("apiKey")} type="password" className={inputStyles} maxLength={36} required disabled={loadingState} />
                <label htmlFor="apiKey" className={inputLabelStyles}>
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
                    <label htmlFor="record" className={dropdownLabelStyles}>
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
