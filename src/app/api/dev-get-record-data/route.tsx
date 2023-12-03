import { NextResponse } from "next/server";
import {
    getArtistById,
    getGenreById,
    getRecords,
    getRecordToArtistById,
    getRecordToGenreById
} from "@/database/records";

import type { GenresType, RecordDataType } from "@/app/lib/type-library";

const recordData: RecordDataType[] = [];

async function getArtistData(recordId: number) {
    const recordToArtistId = await getRecordToArtistById(recordId);
    const artist = await getArtistById(recordToArtistId?.ArtistId!);

    return artist;
}

async function getGenresForRecord(recordId: number) {
    return await getRecordToGenreById(recordId);
}

async function getSpecificGenre(genreId: number) {
    return await getGenreById(genreId);
}

export async function GET() {
    const records = await getRecords();

    records?.forEach(async (record) => {
        const artist = await getArtistData(record.RecordId);
        const recordToGenreList = await getGenresForRecord(record.RecordId);

        const genresForRecord: GenresType[] = [];

        recordToGenreList?.forEach(async (e) => {
            const genre = await getSpecificGenre(e.GenreId);
            genresForRecord.push(genre!);
        });

        console.log(genresForRecord);

        recordData.push({
            RecordId: record.RecordId,
            RecordName: record.Name,
            Year: +record.Year!,
            ImageUrl: record.ImageUrl!,
            DiscogsUrl: record.DiscogsUrl!,
            ArtistId: artist?.ArtistId!,
            ArtistName: artist?.Name!,
            Genres: genresForRecord
        });
    });

    return NextResponse.json(recordData);
}