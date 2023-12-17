"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { DropdownItem, inputStyles, inputLabelStyles, dropdownLabelStyles, dropdownStyles } from "./dropdown-configuration";
import { components } from "react-select";
import noDataFound from "../global-components/no-data-found";

import type {
    AddArtistType,
    AddGenreType,
    AddRecordToArtistType,
    AddRecordToGenreType,
    ArtistsType,
    DeleteRecordToArtistType,
    DeleteRecordToGenreType,
    GenresType,
    RecordDataType,
    UpdateRecordType
} from "@/app/lib/type-library";

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
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [showFormFields, setShowFormFields] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordDataType[]>([]);
    const [artists, setArtists] = useState<ArtistsType[]>([]);
    const [genres, setGenres] = useState<GenresType[]>([]);

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
                    label: e.split("%")[1],
                });
            });

            setValue("recordName", record.RecordName);
            setValue("artist", { value: record.ArtistId, label: record.ArtistName });
            setValue("genre", recordGenres);
            setValue("year", record.Year);
            setValue("discogsUrl", record.DiscogsUrl);
            setValue("imageUrl", record.ImageUrl);
        }
    }, [records, selectedRecord, setValue]);

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
                } as AddArtistType);
                artist = +data.message;
            } else {
                artist = +formData.artist.value!;
            }

            const genreNumberArray: number[] = [];

            for (var i = 0; i < formData.genre.length; i++) {
                if (isNaN(+formData.genre![i].value!)) {
                    const { data } = await axios.post("/api/dev-new-genre", {
                        apiKey: enteredKey,
                        genreName: formData.genre[i].label,
                    } as AddGenreType);
                    genreNumberArray.push(+data.message);
                    const newGenre: GenresType = { GenreId: +data.message[0], Name: formData.genre[i].label! };
                    genres.push(newGenre);
                } else {
                    genreNumberArray.push(+formData.genre[i].value!);
                }
            }

            const record = records.filter((recordId) => recordId.RecordId === selectedRecord?.value)[0];
            const dataBuilder: UpdateRecordType = {
                apiKey: "",
                recordId: undefined,
                originalRecordName: record.RecordName,
                newRecordName: undefined,
                year: undefined,
                imageUrl: undefined,
                discogsUrl: undefined,
            };

            dataBuilder!.apiKey = enteredKey;
            dataBuilder!.recordId = +formData.record.value!;
            record.RecordName !== formData.recordName ? dataBuilder!.newRecordName = formData.recordName : dataBuilder!.newRecordName = undefined;

            if (record.ArtistId !== artist) {
                //Delete unused record to artist relationships
                await axios.post("/api/dev-delete-record-to-artist", {
                    apiKey: enteredKey,
                    recordId: dataBuilder!.recordId,
                    artistId: record.ArtistId,
                    artistTypeId: 1,
                } as DeleteRecordToArtistType);

                //Add new record to artist relationships
                await axios.post("/api/dev-new-record-to-artist", {
                    apiKey: enteredKey,
                    recordId: dataBuilder!.recordId,
                    artistId: artist,
                    artistTypeId: 1,
                } as AddRecordToArtistType);
            }

            const originalGenreSplit = record.Genres.split(","); //Array of the genre list split like '3%Alternative'
            const originalGenreList: number[] = []; //Array of the genre list split only as numbers

            for (var i = 0; i < originalGenreSplit.length; i++) {
                originalGenreList.push(+originalGenreSplit[i].split("%")[0]); //Push genre IDs to array
            }

            if (originalGenreList.sort() !== genreNumberArray.sort()) {

                //Delete unused record to genre relationships
                for (var i = 0; i < originalGenreList.length; i++) {
                    if (!genreNumberArray.includes(originalGenreList[i])) {
                        await axios.post("/api/dev-delete-record-to-genre", {
                            apiKey: enteredKey,
                            recordId: dataBuilder!.recordId,
                            genreId: originalGenreList[i],
                        } as DeleteRecordToGenreType);
                    }
                }

                //Add new record to genre relationships
                for (var i = 0; i < genreNumberArray.length; i++) {
                    if (!originalGenreList.includes(genreNumberArray[i])) {
                        await axios.post("/api/dev-new-record-to-genre", {
                            apiKey: enteredKey,
                            recordId: dataBuilder!.recordId,
                            genreId: genreNumberArray[i],
                        } as AddRecordToGenreType);
                    }
                }
            }

            record.Year !== formData.year ? dataBuilder!.year = +formData.year! : dataBuilder!.year = undefined;
            record.ImageUrl !== formData.imageUrl ? dataBuilder!.imageUrl = formData.imageUrl : dataBuilder!.imageUrl = undefined;
            record.DiscogsUrl !== formData.discogsUrl ? dataBuilder!.discogsUrl = formData.discogsUrl : dataBuilder!.discogsUrl = undefined;

            const { data } = await axios.post("/api/dev-update-record", {
                apiKey: dataBuilder.apiKey,
                recordId: dataBuilder.recordId,
                originalRecordName: dataBuilder.originalRecordName,
                newRecordName: dataBuilder.newRecordName,
                year: dataBuilder.year,
                imageUrl: dataBuilder.imageUrl,
                discogsUrl: dataBuilder.discogsUrl,
            } as UpdateRecordType);

            if (data.status === "Error") {
                setSubmitState("Error");
            } else {
                remapFields();
                setShowFormFields(false);
                setSubmitState("Success");
                reset();
                setValue("record", { value: undefined, label: undefined });
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

    function remapFields() {
        axios.get("/api/dev-get-record-data").then((response) => {
            setRecords(response.data);
        });

        axios.get("/api/dev-get-artists").then((response) => {
            setArtists(response.data);
        });

        axios.get("/api/dev-get-genres").then((response) => {
            setGenres(response.data);
        });
    }

    return (
        <>
            <form className="flex flex-wrap w-full mt-1 developer-tools-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap w-full gap-8">
                    <div className="relative w-full group">
                        <label htmlFor="record" className={dropdownLabelStyles}>
                            Record
                        </label>
                        <Controller name="record" control={control} rules={{ required: true }} render={({ field }) =>
                            <Select {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={loadingState ? [] : recordOptions} noOptionsMessage={() => noDataFound("record")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
                        } />
                    </div>
                    {showFormFields ? <>
                        {GetApiField()}
                        <div className="relative w-full group">
                            <input {...register("recordName")} type="text" className={inputStyles} required disabled={loadingState} />
                            <label htmlFor="recordName" className={inputLabelStyles}>
                                Record Name
                            </label>
                        </div>
                        <div className="relative w-full group">
                            <label htmlFor="artist" className={dropdownLabelStyles}>
                                Artist
                            </label>
                            <Controller name="artist" control={control} rules={{ required: true }} render={({ field }) =>
                                <CreatableSelect {...field} isClearable={false} isMulti={false} isLoading={loadingState} options={loadingState ? [] : artistOptions} noOptionsMessage={() => noDataFound("Artists")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={50} /> }} required />
                            } />
                        </div>
                        <div className="relative w-full group">
                            <label htmlFor="genre" className={dropdownLabelStyles}>
                                Genre
                            </label>
                            <Controller name="genre" control={control} rules={{ required: true }} render={({ field }) =>
                                <CreatableSelect {...field} isClearable={true} isMulti={true} isLoading={loadingState} options={loadingState ? [] : genreOptions} noOptionsMessage={() => noDataFound("Genres")} styles={dropdownStyles} components={{ Input: props => <components.Input {...props} maxLength={15} /> }} required />
                            } />
                        </div>
                        <div className="relative w-full group">
                            <input {...register("year")} type="number" className={inputStyles} required disabled={loadingState} />
                            <label htmlFor="year" className={inputLabelStyles}>
                                Year
                            </label>
                        </div>
                        <div className="relative w-full group">
                            <input {...register("imageUrl")} type="url" className={inputStyles} required disabled={loadingState} />
                            <label htmlFor="imageUrl" className={inputLabelStyles}>
                                Image Filename
                            </label>
                        </div>
                        <div className="relative w-full group">
                            <input {...register("discogsUrl")} type="url" className={inputStyles} required disabled={loadingState} />
                            <label htmlFor="discogsUrl" className={inputLabelStyles}>
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