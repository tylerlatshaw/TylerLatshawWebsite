"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material/";
import { Button } from "@material-tailwind/react";
import Select from "react-select";
import { DropdownItem, dropdownLabelStyles, dropdownStyles } from "./dropdown-configuration";
import noDataFound from "../global-components/no-data-found";

import type { ArtistsType, GenresType, RecordDataType } from "@/app/lib/type-library";

type FormInputs = {
    artist: DropdownItem[],
    genre: DropdownItem[],
};

export default function AddRecordsForm() {

    const {
        handleSubmit,
        control,
    } = useForm<FormInputs>({});

    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [records, setRecords] = useState<RecordDataType[]>([]);
    const [matchedRecords, setMatchedRecords] = useState<RecordDataType[]>([]);
    const [artists, setArtists] = useState<ArtistsType[]>([]);
    const [genres, setGenres] = useState<GenresType[]>([]);

    const artistOptions: DropdownItem[] = artists.map((value) => ({
        value: value.ArtistId,
        label: value.Name,
    }));

    const genreOptions: DropdownItem[] = genres.map((value) => ({
        value: value.GenreId,
        label: value.Name,
    }));

    useEffect(() => {
        axios.get("/api/get-record-data").then((response) => {
            setRecords(response.data);
        });

        axios.get("/api/get-artists").then((response) => {
            setArtists(response.data);
        });

        axios.get("/api/get-genres").then((response) => {
            setGenres(response.data);
        });
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        setLoadingState(true);

        try {
            const artistMatches: RecordDataType[] = [];

            if (formData.artist !== undefined) {
                for (var i = 0; i < formData.artist.length; i++) {
                    artistMatches.push(...records.filter((e) => (e.ArtistId === formData.artist[i].value)));
                }
            }

            const genreMatches: RecordDataType[] = [];

            // if (formData.genre !== undefined) {
            //     for (var i = 0; i < records.length; i++) {
            //         for (var j = 0; j < formData.genre.length; j++) {
            //             records[i].Genres.split(",").map((e) => {
            //                 if (+e.split("%")[0] === formData.genre[j].value) {
            //                     genreMatches.push(records[i]);
            //                 }
            //             });
            //         }
            //     }
            // }

            //let allMatches: RecordData[] = [...artistMatches, ...genreMatches];

            //allMatches = [...new Set(allMatches)];

            setMatchedRecords([...new Set([...artistMatches, ...genreMatches])]);

        } catch (e) {

        }

        setLoadingState(false);
    };

    return (
        <>
            <form className="flex flex-wrap w-full mt-1 developer-tools-form gap-8" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative w-full group">
                    <label htmlFor="artist" className={dropdownLabelStyles}>
                        Artist
                    </label>
                    <Controller name="artist" control={control} rules={{ required: false }} render={({ field }) =>
                        <Select {...field} isClearable={true} isMulti={true} isLoading={loadingState} options={loadingState ? [] : artistOptions} noOptionsMessage={() => noDataFound("Artists")} styles={dropdownStyles} />
                    } />
                </div>
                <div className="relative w-full group">
                    <label htmlFor="genre" className={dropdownLabelStyles}>
                        Genre
                    </label>
                    <Controller name="genre" control={control} rules={{ required: false }} render={({ field }) =>
                        <Select {...field} isClearable={true} isMulti={true} isLoading={loadingState} options={loadingState ? [] : genreOptions} noOptionsMessage={() => noDataFound("Genres")} styles={dropdownStyles} />
                    } />
                </div>
                <div className="flex items-center">
                    <Button type="submit" className="button text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loadingState}>
                        <span className="flex items-center">
                            {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                        </span>
                    </Button>
                </div>
            </form >
        </>
    );
}
