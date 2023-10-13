import { getArtists, getGenres, getRecordToArtist, getRecordToGenre, deleteRecord, Artists, RecordToArtist, Genres, RecordToGenre, deleteArtist, deleteGenre } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string
    recordName: string
    recordId: number
}

export async function POST(request: Request) {

    const { apiKey,
        recordName,
        recordId } = await request.json() as RequestJson;

    var formData = {
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
            message: formData.recordName + " successfully deleted!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}

async function clearUnusedArtists() {
    const artists: Artists[] = await Promise.all((await getArtists()).map(async (item) => {
        return ({
            ArtistId: item.ArtistId,
            Name: item.Name
        });
    }));

    const recordToArtist: RecordToArtist[] = await Promise.all((await getRecordToArtist()).map(async (item) => {
        return ({
            RecordToArtistId: item.RecordToArtistId,
            ArtistId: item.ArtistId,
            RecordId: item.RecordId
        });
    }));

    artists.map((artist) => {
        if(!recordToArtist.some(index => index.ArtistId === artist.ArtistId)) {
            deleteArtist(artist.ArtistId);
        }
    });
}

async function clearUnusedGenres() {
    const genres: Genres[] = await Promise.all((await getGenres()).map(async (item) => {
        return ({
            GenreId: item.GenreId,
            Name: item.Name
        });
    }));

    const recordToGenre: RecordToGenre[] = await Promise.all((await getRecordToGenre()).map(async (item) => {
        return ({
            RecordToGenreId: item.RecordToGenreId,
            GenreId: item.GenreId,
            RecordId: item.RecordId
        });
    }));

    genres.map((genre) => {
        if(!recordToGenre.some(index => index.GenreId === genre.GenreId)) {
            deleteGenre(genre.GenreId);
        }
    });
}