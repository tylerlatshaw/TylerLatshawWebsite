import { NextResponse } from "next/server";
import { getArtists, getGenres, getRecordToArtist, getRecordToGenre, deleteRecord, deleteArtist, deleteGenre } from "@/database/records";

import type { ArtistsType, DeleteRecordType, GenresType, RecordToArtistType, RecordToGenreType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordName,
        recordId
    } = await request.json() as DeleteRecordType;

    const formData = {
        apiKey,
        recordName,
        recordId
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            deleteRecord(formData)
        ]);

        await clearUnusedArtists();
        await clearUnusedGenres();

        return NextResponse.json({
            status: "Ok",
            message: formData.recordName + " successfully deleted!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}

async function clearUnusedArtists() {
    const artists: ArtistsType[] = await Promise.all((await getArtists() ?? []).map(async (item) => {
        return ({
            ArtistId: item.ArtistId,
            Name: item.Name,
        });
    }));

    const recordToArtist: RecordToArtistType[] = await Promise.all((await getRecordToArtist() ?? []).map(async (item) => {
        return ({
            RecordToArtistId: item.RecordToArtistId,
            ArtistId: item.ArtistId,
            RecordId: item.RecordId,
        });
    }));

    artists.map((artist) => {
        if (!recordToArtist.some(index => index.ArtistId === artist.ArtistId)) {
            deleteArtist(artist.ArtistId);
        }
    });
}

async function clearUnusedGenres() {
    const genres: GenresType[] = await Promise.all((await getGenres() ?? []).map(async (item) => {
        return ({
            GenreId: item.GenreId,
            Name: item.Name,
        });
    }));

    const recordToGenre: RecordToGenreType[] = await Promise.all((await getRecordToGenre() ?? []).map(async (item) => {
        return ({
            RecordToGenreId: item.RecordToGenreId,
            GenreId: item.GenreId,
            RecordId: item.RecordId,
        });
    }));

    genres.map((genre) => {
        if (!recordToGenre.some(index => index.GenreId === genre.GenreId)) {
            deleteGenre(genre.GenreId);
        }
    });
}