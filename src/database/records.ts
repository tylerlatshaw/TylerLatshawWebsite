import { supabase } from "@/utilities/supabase";

import type {
    AddRecordType,
    AddRecordToArtistType,
    AddRecordToGenreType,
    DeleteRecordType,
    DeleteRecordToArtistType,
    DeleteRecordToGenreType,
    UpdateRecordType
} from "@/app/lib/type-library";

export async function addArtist(formData: string) {
    const { data } = await supabase
        .from("Artists")
        .insert({
            Name: formData.trim()
        })
        .select("ArtistId");

    return data![0].ArtistId;
}

export async function addGenre(formData: string) {
    const { data } = await supabase
        .from("Genres")
        .insert({
            Name: formData.trim()
        })
        .select("GenreId");

    return data![0].GenreId;
}

export async function addRecord(formData: AddRecordType) {
    const { data } = await supabase
        .from("Records")
        .insert({
            Name: formData.recordName.trim(),
            Year: formData.year,
            ImageUrl: formData.imageUrl.trim(),
            DiscogsUrl: formData.discogsUrl.trim()
        })
        .select("RecordId");

    await supabase
        .from("RecordToArtist")
        .insert({
            ArtistId: formData.artistId,
            ArtistTypeId: formData.artistTypeId,
            RecordId: data![0].RecordId
        });

    formData.genreId.map(async (genre) => {
        await supabase
            .from("RecordToGenre")
            .insert({
                RecordId: data![0].RecordId,
                GenreId: genre
            });
    });
}

export async function addRecordToArtist(formData: AddRecordToArtistType) {
    await supabase
        .from("RecordToArtist")
        .insert({
            RecordId: formData.recordId,
            ArtistId: formData.artistId,
            ArtistTypeId: formData.artistTypeId
        });
}

export async function addRecordToGenre(formData: AddRecordToGenreType) {
    await supabase
        .from("RecordToGenre")
        .insert({
            RecordId: formData.recordId,
            GenreId: formData.genreId
        });
}

export async function deleteArtist(formData: number) {
    await supabase
        .from("Artists")
        .delete()
        .match({
            ArtistId: formData
        });
}

export async function deleteGenre(formData: number) {
    await supabase
        .from("Genre")
        .delete()
        .match({
            GenreId: formData
        });
}

export async function deleteRecord(formData: DeleteRecordType) {
    await supabase
        .from("Records")
        .delete()
        .match({
            RecordId: formData.recordId
        });

    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: formData.recordId
        });

    await supabase
        .from("RecordToGenre")
        .delete()
        .match({
            RecordId: formData.recordId
        });
}

export async function deleteRecordToArtist(formData: DeleteRecordToArtistType) {
    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: formData.recordId,
            ArtistId: formData.artistId,
            ArtistTypeId: formData.artistTypeId
        });
}

export async function deleteRecordToGenre(formData: DeleteRecordToGenreType) {
    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: formData.recordId,
            GenreId: formData.genreId
        });
}

export async function getArtistById(artistId: number) {
    const { data } = await supabase
        .from("Artists")
        .select("ArtistId, Name")
        .match({
            ArtistId: artistId
        })
        .limit(1)
        .single();

    return data;
}

export async function getArtists() {
    const { data } = await supabase
        .from("Artists")
        .select("ArtistId, Name")
        .order("Name");

    return data;
}

export async function getGenreById(genreId: number) {
    const { data } = await supabase
        .from("Genres")
        .select("GenreId, Name")
        .match({
            GenreId: genreId
        })
        .limit(1)
        .single();

    return data;
}

export async function getGenres() {
    const { data } = await supabase
        .from("Genres")
        .select("GenreId, Name")
        .order("Name");

    return data;
}

export async function getRecordData() {
    const { data } = await supabase
        .from("RecordData")
        .select("RecordId, RecordName, Year, ImageUrl, DiscogsUrl, ArtistId, ArtistName, Genres")
        .order("RecordName");

    return data;
}

export async function getRecords() {
    const { data } = await supabase
        .from("Records")
        .select("RecordId, Name, Year, ImageUrl, DiscogsUrl")
        .order("Name");

    return data;
}

export async function getRecordToArtist() {
    const { data } = await supabase
        .from("RecordToArtist")
        .select("RecordToArtistId, RecordId, ArtistId, ArtistTypeId");

    return data;
}

export async function getRecordToArtistById(recordId: number) {
    const { data } = await supabase
        .from("RecordToArtist")
        .select("RecordToArtistId, RecordId, ArtistId, ArtistTypeId")
        .match({
            RecordId: recordId
        })
        .limit(1)
        .single();

    return data;
}

export async function getRecordToGenre() {
    const { data } = await supabase
        .from("RecordToGenre")
        .select("RecordToGenreId, RecordId, GenreId");

    return data;
}

export async function getRecordToGenreById(recordId: number) {
    const { data } = await supabase
        .from("RecordToGenre")
        .select("RecordToGenreId, RecordId, GenreId")
        .match({
            RecordId: recordId
        });

    return data;
}

export async function updateRecord(formData: UpdateRecordType) {
    await supabase
        .from("Records")
        .update({
            Name: formData.newRecordName!.trim(),
            Year: formData.year,
            ImageUrl: formData.imageUrl!.trim(),
            DiscogsUrl: formData.discogsUrl!.trim()
        })
        .match({
            RecordId: formData.recordId
        });
}