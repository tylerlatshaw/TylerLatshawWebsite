import { PrismaClient } from "@prisma/client";

import { RequestJson as RequestJsonNewRecord } from "@/app/api/dev-handle-new-record/route";
import { RequestJson as RequestJsonNewRecordToArtist } from "@/app/api/dev-handle-new-record-to-artist/route";
import { RequestJson as RequestJsonNewRecordToGenre } from "@/app/api/dev-handle-new-record-to-genre/route";

import { RequestJson as RequestJsonEditRecord } from "@/app/api/dev-handle-edit-record/route";

import { RequestJson as RequestJsonDeleteRecord } from "@/app/api/dev-handle-delete-record/route";
import { RequestJson as RequestJsonDeleteRecordToArtist } from "@/app/api/dev-handle-delete-record-to-artist/route";
import { RequestJson as RequestJsonDeleteRecordToGenre } from "@/app/api/dev-handle-delete-record-to-genre/route";

import { stoGetRecordData } from "./stoGetRecordData";

const prisma = new PrismaClient();


/*******************************/
/*****
/*****    TYPES 
/*****
/*******************************/

export type RecordData = {
    RecordId: number,
    RecordName: string,
    Year: number,
    ImageUrl: string,
    DiscogUrl: string,
    ArtistId: number,
    ArtistName: string,
    Genres: string,
}

export type Records = {
    RecordId: number,
    Name: string
}

export type Artists = {
    ArtistId: number,
    Name: string,
}

export type RecordToArtist = {
    RecordToArtistId: number,
    ArtistId: number,
    RecordId: number,
}

export type Genres = {
    GenreId: number,
    Name: string,
}

export type RecordToGenre = {
    RecordToGenreId: number,
    GenreId: number,
    RecordId: number,
}


/*******************************/
/*****
/*****    GET FUNCTIONS 
/*****
/*******************************/

export async function getRecordData() {
    const records: RecordData[] = await prisma.$queryRawUnsafe(stoGetRecordData);

    return records;
}

export async function getRecords() {
    const records: Records[] = await prisma.records.findMany({
        select: {
            RecordId: true,
            Name: true,
        },
        orderBy: [
            {
                Name: "asc",
            }
        ]
    });

    return records;
}

export async function getArtists() {
    const artists: Artists[] = await prisma.artists.findMany({
        select: {
            ArtistId: true,
            Name: true,
        },
        distinct: ["Name"],
        orderBy: [
            {
                Name: "asc",
            }
        ]
    });

    return artists;
}

export async function getRecordToArtist() {
    const recordToArtist: RecordToArtist[] = await prisma.recordToArtist.findMany({
        select: {
            RecordToArtistId: true,
            ArtistId: true,
            RecordId: true,
        }
    });

    return recordToArtist;
}

export async function getGenres() {
    const genres: Genres[] = await prisma.genres.findMany({
        select: {
            GenreId: true,
            Name: true,
        },
        distinct: ["Name"],
        orderBy: [
            {
                Name: "asc",
            }
        ]
    });

    return genres;
}

export async function getRecordToGenre() {
    const recordToGenre: RecordToGenre[] = await prisma.recordToGenre.findMany({
        select: {
            RecordToGenreId: true,
            GenreId: true,
            RecordId: true,
        }
    });

    return recordToGenre;
}


/*******************************/
/*****
/*****    ADD FUNCTIONS 
/*****
/*******************************/

export async function addRecord(formData: RequestJsonNewRecord) {
    const newRecord = await prisma.records.create({
        data: {
            Name: formData.recordName?.trim(),
            Year: formData.year,
            ImageUrl: formData.imageUrl?.trim(),
            DiscogUrl: formData.discogsUrl?.trim(),
        }
    });

    await prisma.recordToArtist.create({
        data: {
            ArtistId: formData.artistId,
            ArtistTypeId: formData.artistTypeId,
            RecordId: newRecord.RecordId,
        }
    });

    formData.genreId.map(async (genre) => {
        await prisma.recordToGenre.create({
            data: {
                RecordId: newRecord.RecordId,
                GenreId: genre,
            }
        });
    });
}

export async function addArtist(formData: string) {
    const newValue = await prisma.artists.create({
        data: {
            Name: formData?.trim(),
        }
    });

    return newValue.ArtistId;
}

export async function addRecordToArtist(formData: RequestJsonNewRecordToArtist) {
    await prisma.recordToArtist.create({
        data: {
            RecordId: formData.recordId!,
            ArtistId: formData.artistId!,
            ArtistTypeId: formData.artistTypeId,
        }
    });
}

export async function addRecordToGenre(formData: RequestJsonNewRecordToGenre) {
    await prisma.recordToGenre.create({
        data: {
            RecordId: formData.recordId!,
            GenreId: formData.genreId!,
        }
    });
}

export async function addGenre(formData: string) {
    const newValue = await prisma.genres.create({
        data: {
            Name: formData?.trim(),
        }
    });

    return newValue.GenreId;
}


/*******************************/
/*****
/*****    UPDATE FUNCTIONS 
/*****
/*******************************/

export async function updateRecord(formData: RequestJsonEditRecord) {
    await prisma.records.update({
        where: {
            RecordId: formData.recordId,
        },
        data: {
            Name: formData.newRecordName?.trim(),
            Year: formData.year,
            ImageUrl: formData.imageUrl?.trim(),
            DiscogUrl: formData.discogsUrl?.trim(),
        }
    });
}


/*******************************/
/*****
/*****    DELETE FUNCTIONS 
/*****
/*******************************/

export async function deleteRecord(formData: RequestJsonDeleteRecord) {
    await prisma.records.delete({
        where: {
            RecordId: formData.recordId,
        }
    });

    await prisma.recordToArtist.deleteMany({
        where: {
            RecordId: formData.recordId,
        }
    });

    await prisma.recordToGenre.deleteMany({
        where: {
            RecordId: formData.recordId,
        }
    });
}

export async function deleteArtist(formData: number) {
    await prisma.artists.delete({
        where: {
            ArtistId: formData,
        }
    });
}

export async function deleteRecordToArtist(formData: RequestJsonDeleteRecordToArtist) {
    await prisma.recordToArtist.deleteMany({
        where: {
            RecordId: formData.recordId!,
            ArtistId: formData.artistId!,
            ArtistTypeId: formData.artistTypeId!,
        }
    });
}

export async function deleteGenre(formData: number) {
    await prisma.genres.delete({
        where: {
            GenreId: formData,
        }
    });
}

export async function deleteRecordToGenre(formData: RequestJsonDeleteRecordToGenre) {
    await prisma.recordToGenre.deleteMany({
        where: {
            RecordId: formData.recordId,
            GenreId: formData.genreId,
        }
    });
}