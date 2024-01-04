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
    const {
        recordName,
        artistId,
        artistTypeId,
        genreId,
        year,
        imageUrl,
        discogsUrl
    } = formData;

    const { data } = await supabase
        .from("Records")
        .insert({
            Name: recordName.trim(),
            Year: year,
            ImageUrl: imageUrl.trim(),
            DiscogsUrl: discogsUrl.trim()
        })
        .select("RecordId");

    await supabase
        .from("RecordToArtist")
        .insert({
            ArtistId: artistId,
            ArtistTypeId: artistTypeId,
            RecordId: data![0].RecordId
        });

    genreId.map(async (genre) => {
        await supabase
            .from("RecordToGenre")
            .insert({
                RecordId: data![0].RecordId,
                GenreId: genre
            });
    });
}

export async function addRecordToArtist(formData: AddRecordToArtistType) {
    const {
        recordId,
        artistId,
        artistTypeId
    } = formData;

    await supabase
        .from("RecordToArtist")
        .insert({
            RecordId: recordId,
            ArtistId: artistId,
            ArtistTypeId: artistTypeId
        });
}

export async function addRecordToGenre(formData: AddRecordToGenreType) {
    const {
        recordId,
        genreId
    } = formData;

    await supabase
        .from("RecordToGenre")
        .insert({
            RecordId: recordId,
            GenreId: genreId
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
    const { recordId } = formData;

    await supabase
        .from("Records")
        .delete()
        .match({
            RecordId: recordId
        });

    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: recordId
        });

    await supabase
        .from("RecordToGenre")
        .delete()
        .match({
            RecordId: recordId
        });
}

export async function deleteRecordToArtist(formData: DeleteRecordToArtistType) {
    const {
        recordId,
        artistId,
        artistTypeId
    } = formData;

    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: recordId,
            ArtistId: artistId,
            ArtistTypeId: artistTypeId
        });
}

export async function deleteRecordToGenre(formData: DeleteRecordToGenreType) {
    const {
        recordId,
        genreId
    } = formData;

    await supabase
        .from("RecordToArtist")
        .delete()
        .match({
            RecordId: recordId,
            GenreId: genreId
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
        .select("RecordId");

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
    const {
        recordId,
        newRecordName,
        year,
        imageUrl,
        discogsUrl
    } = formData;

    await supabase
        .from("Records")
        .update({
            Name: newRecordName!.trim(),
            Year: year,
            ImageUrl: imageUrl!.trim(),
            DiscogsUrl: discogsUrl!.trim()
        })
        .match({
            RecordId: recordId
        });
}