"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import { RequestJson as RequestJsonEditRecord } from "@/app/api/dev-handle-edit-record/route";
import { RequestJson as RequestJsonNewArtist } from "@/app/api/dev-handle-new-artist/route";
import { RequestJson as RequestJsonNewGenre } from "@/app/api/dev-handle-new-genre/route";
import { RequestJson as RequestJsonNewRecordToGenre } from "@/app/api/dev-handle-new-record-to-genre/route";
import { RequestJson as RequestJsonNewRecordToArtist } from "@/app/api/dev-handle-new-record-to-artist/route";
import { RequestJson as RequestJsonDeleteRecordToGenre } from "@/app/api/dev-handle-delete-record-to-genre/route";
import { RequestJson as RequestJsonDeleteRecordToArtist } from "@/app/api/dev-handle-delete-record-to-artist/route";
import { Artists, Genres, RecordData } from "@/database/records";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { DropdownItem, dropdownStyles } from "./developer-accordion";
import { components } from "react-select";
import noDataFound from "./no-data-found";

const environment = process.env.NODE_ENV;

type SubmitState = "Idle" | "Success" | "Error";

type FormInputs = {
    apiKey: string,
    record: DropdownItem,
    recordName: string,
    artist: DropdownItem,
    genre: DropdownItem[],
    year: number,
    imageUrl: string,
    discogsUrl: string,
};

export default function EditRecordsForm() {

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        watch,
    } = useForm<FormInputs>();

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<String>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [showFormFields, setShowFormFields] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordData[]>([]);
    const [artists, setArtists] = useState<Artists[]>([]);
    const [genres, setGenres] = useState<Genres[]>([]);

    const recordOptions: DropdownItem[] = records.map((value) => ({
        value: value.RecordId,
        label: value.RecordName + " - " + value.ArtistName + " (ID: " + value.RecordId + ")",
    }));

    const artistOptions: DropdownItem[] = artists.map((value) => ({
        value: value.ArtistId,
        label: value.Name,
    }));

    const genreOptions: DropdownItem[] = genres.map((value) => ({
        value: value.GenreId,
        label: value.Name,
    }));

    const selectedRecord = watch("record");

    useEffect(() => {
        axios.get("/api/dev-get-record-data").then((response) => {
            setRecords(response.data);
        });

        axios.get("/api/dev-get-artists").then((response) => {
            setArtists(response.data);
        });

        axios.get("/api/dev-get-genres").then((response) => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedRecord?.value) {
            setShowFormFields(true);
            setResponseMessage("");

            const record = records.filter((recordId) => recordId.RecordId === selectedRecord?.value)[0];
            const recordGenres: DropdownItem[] = [];

            record.Genres.split(",").map((e) => {
                recordGenres.push({
                    value: +e.split("%")[0],
                    label: e.split("%")[1]
                });
            });

            setValue("recordName", record.RecordName);
            setValue("artist", { value: record.ArtistId, label: record.ArtistName });
            setValue("genre", recordGenres);
            setValue("year", record.Year);
            setValue("discogsUrl", record.DiscogUrl);
            setValue("imageUrl", record.ImageUrl);
        }
    }, [records, selectedRecord, setValue]);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            var enteredKey;

            if (environment === "development") {
                enteredKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
            } else {
                enteredKey = formData.apiKey;
            }

            var artist: number;

            if (isNaN(+formData.artist.value!)) {
                const { data } = await axios.post("/api/dev-handle-new-artist", {
                    apiKey: enteredKey,
                    artistName: formData.artist.label,
                } as RequestJsonNewArtist);
                artist = +data.message;
            } else {
                artist = +formData.artist.value!;
            }

            var genreNumberArray: number[] = [];

            for (var i = 0; i < formData.genre.length; i++) {
                if (isNaN(+formData.genre![i].value!)) {
                    const { data } = await axios.post("/api/dev-handle-new-genre", {
                        apiKey: enteredKey,
                        genreName: formData.genre[i].label,
                    } as RequestJsonNewGenre);
                    genreNumberArray.push(+data.message);
                    const newGenre: Genres = { GenreId: +data.message[0], Name: formData.genre[i].label! };
                    genres.push(newGenre);
                } else {
                    genreNumberArray.push(+formData.genre[i].value!);
                }
            }

            const record = records.filter((recordId) => recordId.RecordId === selectedRecord?.value)[0];
            var dataBuilder: RequestJsonEditRecord = {
                apiKey: "",
                recordId: undefined,
                recordName: undefined,
                year: undefined,
                imageUrl: undefined,
                discogsUrl: undefined
            };

            dataBuilder!.apiKey = enteredKey;
            dataBuilder!.recordId = +formData.record.value!;
            record.RecordName !== formData.recordName ? dataBuilder!.recordName = formData.recordName : dataBuilder!.recordName = undefined;

            if (record.ArtistId !== artist) {
                //Delete unused record to artist relationships
                await axios.post("/api/dev-handle-delete-record-to-artist", {
                    apiKey: enteredKey,
                    recordId: dataBuilder!.recordId,
                    artistId: record.ArtistId,
                    artistTypeId: 1
                } as RequestJsonDeleteRecordToArtist);

                //Add new record to artist relationships
                await axios.post("/api/dev-handle-new-record-to-artist", {
                    apiKey: enteredKey,
                    recordId: dataBuilder!.recordId,
                    artistId: artist,
                    artistTypeId: 1
                } as RequestJsonNewRecordToArtist);
            }

            var originalGenreSplit = record.Genres.split(","); //Array of the genre list split like '3%Alternative'
            var originalGenreList: number[] = []; //Array of the genre list split only as numbers

            for (var i = 0; i < originalGenreSplit.length; i++) {
                originalGenreList.push(+originalGenreSplit[i].split("%")[0]); //Push genre IDs to array
            }

            if (originalGenreList.sort() !== genreNumberArray.sort()) {

                //Delete unused record to genre relationships
                for (var i = 0; i < originalGenreList.length; i++) {
                    if (!genreNumberArray.includes(originalGenreList[i])) {
                        await axios.post("/api/dev-handle-delete-record-to-genre", {
                            apiKey: enteredKey,
                            recordId: dataBuilder!.recordId,
                            genreId: originalGenreList[i],
                        } as RequestJsonDeleteRecordToGenre);
                    }
                }

                //Add new record to genre relationships
                for (var i = 0; i < genreNumberArray.length; i++) {
                    if (!originalGenreList.includes(genreNumberArray[i])) {
                        await axios.post("/api/dev-handle-new-record-to-genre", {
                            apiKey: enteredKey,
                            recordId: dataBuilder!.recordId,
                            genreId: genreNumberArray[i],
                        } as RequestJsonNewRecordToGenre);
                    }
                }
            }

            record.Year !== formData.year ? dataBuilder!.year = +formData.year! : dataBuilder!.year = undefined;
            record.ImageUrl !== formData.imageUrl ? dataBuilder!.imageUrl = formData.imageUrl : dataBuilder!.imageUrl = undefined;
            record.DiscogUrl !== formData.discogsUrl ? dataBuilder!.discogsUrl = formData.discogsUrl : dataBuilder!.discogsUrl = undefined;

            const { data } = await axios.post("/api/dev-handle-edit-record", {
                apiKey: dataBuilder.apiKey,
                recordId: dataBuilder.recordId,
                recordName: dataBuilder.recordName,
                year: dataBuilder.year,
                imageUrl: dataBuilder.imageUrl,
                discogsUrl: dataBuilder.discogsUrl,
            } as RequestJsonEditRecord);

            if (data.status === "Error") {
                setSubmitState("Error");
            } else {
                setSubmitState("Success");
                setShowFormFields(false);
                reset();
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
            <form className="flex flex-wrap w-full mt-1 developer-tools-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap w-full gap-8">
                    <div className="relative w-full group">
                        <label htmlFor="record" className="flex flex-wrap mb-2 w-full pointer-events-none select-none font-semibold text-green-600">
                            Record
                        </label>
                        <Controller name="record" control={control} rules={{ required: true }} render={({ field }) =>
                            <Select {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={loadingState ? [] : recordOptions} noOptionsMessage={() => noDataFound("record")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
                        } />
                    </div>
                    {showFormFields ? <>
                        {GetApiField()}
                        <div className="relative w-full group">
                            <input {...register("recordName")} type="text" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
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
                                Genre
                            </label>
                            <Controller name="genre" control={control} rules={{ required: true }} render={({ field }) =>
                                <CreatableSelect {...field} isClearable={true} isMulti={true} isLoading={loadingState} options={loadingState ? [] : genreOptions} noOptionsMessage={() => noDataFound("Genres")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={15} /> }} required />
                            } />
                        </div>
                        <div className="relative w-full group">
                            <input {...register("year")} type="number" className="peer h-full w-full border-b border-gray-400 bg-transparent pt-5 pb-1.5 outline outline-0 transition-all focus:border-green-500" required disabled={loadingState} />
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
                    </> : null}
                </div>
                <span className={`flex flex-wrap items-center mt-4 text-md font-semibold ${GetResponseCssClass()}`}>{responseMessage}</span>
            </form >
        </>
    );
}