import { Database } from "./database-types";

export type Artists = Database["public"]["Tables"]["Artists"]["Row"];

export type ArtistType = Database["public"]["Tables"]["ArtistType"]["Row"];

export type Contact = Database["public"]["Tables"]["Contact"]["Row"];

export type Genres = Database["public"]["Tables"]["Genres"]["Row"];

export type ListenHistory = Database["public"]["Tables"]["ListenHistory"]["Row"];

export type RecordToArtist = Database["public"]["Tables"]["RecordToArtist"]["Row"];

export type RecordToGenre = Database["public"]["Tables"]["RecordToGenre"]["Row"];

export type Records = Database["public"]["Tables"]["Records"]["Row"];