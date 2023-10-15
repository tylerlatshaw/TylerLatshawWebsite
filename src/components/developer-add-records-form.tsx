"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import { RequestJson as RequestJsonNewRecord } from "@/app/api/dev-new-record/route";
import { RequestJson as RequestJsonNewArtist } from "@/app/api/dev-new-artist/route";
import { RequestJson as RequestJsonNewGenre } from "@/app/api/dev-new-genre/route";
import { Artists, Genres } from "@/database/records";
import CreatableSelect from "react-select/creatable";
import { DropdownItem, dropdownStyles } from "./developer-accordion";
import { components } from "react-select";
import noDataFound from "./no-data-found";

const environment = process.env.NODE_ENV;

type SubmitState = "Idle" | "Success" | "Error";

type FormInputs = {
    apiKey: string,
    recordName: string,
    artist: DropdownItem,
    genre: DropdownItem[],
    year: number,
    imageUrl: string,
    discogsUrl: string,
};

export default function AddRecordsForm() {

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
    const [artists, setArtists] = useState<Artists[]>([]);
    const [genres, setGenres] = useState<Genres[]>([]);

    const artistOptions: DropdownItem[] = artists.map((value) => ({
        value: value.ArtistId,
        label: value.Name,
    }));

    const genreOptions: DropdownItem[] = genres.map((value) => ({
        value: value.GenreId,
        label: value.Name,
    }));

    useEffect(() => {
        axios.get("/api/dev-get-artists").then((response) => {
            setArtists(response.data);
        });

        axios.get("/api/dev-get-genres").then((response) => {
            setGenres(response.data);
        });
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            let enteredKey;

            if (environment === "development") {
                enteredKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
            } else {
                enteredKey = formData.apiKey;
            }

            let artist: number;

            if (isNaN(+formData.artist.value!)) {
                const { data } = await axios.post("/api/dev-new-artist", {
                    apiKey: enteredKey,
                    artistName: formData.artist.label,
                } as RequestJsonNewArtist);
                artist = +data.message;
            } else {
                artist = +formData.artist.value!;
            }

            const genres: number[] = [];

            for (let i = 0; i < formData.genre.length; i++) {
                if (isNaN(+formData.genre![i].value!)) {
                    const { data } = await axios.post("/api/dev-new-genre", {
                        apiKey: enteredKey,
                        genreName: formData.genre[i].label,
                    } as RequestJsonNewGenre);
                    genres.push(+data.message);
                } else {
                    genres.push(+formData.genre[i].value!);
                }
            }

            const { data } = await axios.post("/api/dev-new-record", {
                apiKey: enteredKey,
                recordName: formData.recordName,
                artistId: artist,
                artistTypeId: 1,
                genreId: genres,
                year: +formData.year!,
                imageUrl: formData.imageUrl,
                discogsUrl: formData.discogsUrl,
            } as RequestJsonNewRecord);

            if (data.status === "Error") {
                setSubmitState("Error");
            } else {
                setSubmitState("Success");
                reset();
                setValue("artist", { value: undefined, label: undefined });
                setValue("genre", []);
            }

            setResponseMessage(data.message);
        } catch (e) {
            setResponseMessage("Something went wrong. Please try again.");
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
                    <input {...register("recordName")} type="text" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" maxLength={50} required disabled={loadingState} />
                    <label htmlFor="recordName" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                        Record Name
                    </label>
                </div>
                <div className="relative w-full group">
                    <label htmlFor="artist" className="flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600">
                        Artist
                    </label>
                    <Controller name="artist" control={control} rules={{ required: true }} render={({ field }) =>
                        <CreatableSelect {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={loadingState ? [] : artistOptions} noOptionsMessage={() => noDataFound("Artists")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
                    } />
                </div>
                <div className="relative w-full group">
                    <label htmlFor="genre" className="flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600">
                        Genres
                    </label>
                    <Controller name="genre" control={control} rules={{ required: true }} render={({ field }) =>
                        <CreatableSelect {...field} isClearable={true} isMulti={true} isLoading={loadingState} options={loadingState ? [] : genreOptions} noOptionsMessage={() => noDataFound("Genres")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={15} /> }} required />
                    } />
                </div>
                <div className="relative w-full group">
                    <input {...register("year")} type="number" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" min={1900} max={2100} required disabled={loadingState} />
                    <label htmlFor="year" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                        Year
                    </label>
                </div>
                <div className="relative w-full group">
                    <input {...register("imageUrl")} type="url" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                    <label htmlFor="imageUrl" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                        Image URL
                    </label>
                </div>
                <div className="relative w-full group">
                    <input {...register("discogsUrl")} type="url" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
                    <label htmlFor="discogsUrl" className="font-semibold text-green-600 pointer-events-none select-none absolute left-0 -top-2.5 flex h-full w-full transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:duration-300 peer-focus:after:scale-x-100">
                        Discogs URL
                    </label>
                </div>
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
