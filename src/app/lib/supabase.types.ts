export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            Artists: {
                Row: {
                    ArtistId: number
                    DateCreated: string
                    DateUpdated: string
                    Name: string
                }
                Insert: {
                    ArtistId?: number
                    DateCreated?: string
                    DateUpdated?: string
                    Name: string
                }
                Update: {
                    ArtistId?: number
                    DateCreated?: string
                    DateUpdated?: string
                    Name?: string
                }
                Relationships: []
            }
            ArtistType: {
                Row: {
                    ArtistTypeId: number
                    DateCreated: string
                    DateUpdated: string
                    Name: string
                }
                Insert: {
                    ArtistTypeId?: number
                    DateCreated?: string
                    DateUpdated?: string
                    Name: string
                }
                Update: {
                    ArtistTypeId?: number
                    DateCreated?: string
                    DateUpdated?: string
                    Name?: string
                }
                Relationships: []
            }
            Contact: {
                Row: {
                    DateCreated: string
                    DateUpdated: string
                    Email: string
                    FormSource: string | null
                    Message: string
                    MessageId: number
                    Name: string
                    ReferringPage: string
                }
                Insert: {
                    DateCreated?: string
                    DateUpdated?: string
                    Email: string
                    FormSource?: string | null
                    Message: string
                    MessageId?: number
                    Name: string
                    ReferringPage: string
                }
                Update: {
                    DateCreated?: string
                    DateUpdated?: string
                    Email?: string
                    FormSource?: string | null
                    Message?: string
                    MessageId?: number
                    Name?: string
                    ReferringPage?: string
                }
                Relationships: []
            }
            Genres: {
                Row: {
                    DateCreated: string
                    DateUpdated: string
                    GenreId: number
                    Name: string
                }
                Insert: {
                    DateCreated?: string
                    DateUpdated?: string
                    GenreId?: number
                    Name: string
                }
                Update: {
                    DateCreated?: string
                    DateUpdated?: string
                    GenreId?: number
                    Name?: string
                }
                Relationships: []
            }
            ListenHistory: {
                Row: {
                    Album: string | null
                    Artist: string | null
                    DateCreated: string
                    DateUpdated: string
                    ListenDate: string
                    ListenHistoryId: number
                    SongTitle: string
                }
                Insert: {
                    Album?: string | null
                    Artist?: string | null
                    DateCreated?: string
                    DateUpdated?: string
                    ListenDate: string
                    ListenHistoryId?: number
                    SongTitle: string
                }
                Update: {
                    Album?: string | null
                    Artist?: string | null
                    DateCreated?: string
                    DateUpdated?: string
                    ListenDate?: string
                    ListenHistoryId?: number
                    SongTitle?: string
                }
                Relationships: []
            }
            Records: {
                Row: {
                    DateCreated: string
                    DateUpdated: string
                    DiscogsUrl: string | null
                    ImageUrl: string | null
                    Name: string
                    RecordId: number
                    Year: number | null
                }
                Insert: {
                    DateCreated?: string
                    DateUpdated?: string
                    DiscogsUrl?: string | null
                    ImageUrl?: string | null
                    Name: string
                    RecordId?: number
                    Year?: number | null
                }
                Update: {
                    DateCreated?: string
                    DateUpdated?: string
                    DiscogsUrl?: string | null
                    ImageUrl?: string | null
                    Name?: string
                    RecordId?: number
                    Year?: number | null
                }
                Relationships: []
            }
            RecordToArtist: {
                Row: {
                    ArtistId: number
                    ArtistTypeId: number
                    DateCreated: string
                    DateUpdated: string
                    RecordId: number
                    RecordToArtistId: number
                }
                Insert: {
                    ArtistId: number
                    ArtistTypeId: number
                    DateCreated?: string
                    DateUpdated?: string
                    RecordId: number
                    RecordToArtistId?: number
                }
                Update: {
                    ArtistId?: number
                    ArtistTypeId?: number
                    DateCreated?: string
                    DateUpdated?: string
                    RecordId?: number
                    RecordToArtistId?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "RecordToArtist_ArtistId_fkey"
                        columns: ["ArtistId"]
                        isOneToOne: false
                        referencedRelation: "Artists"
                        referencedColumns: ["ArtistId"]
                    },
                    {
                        foreignKeyName: "RecordToArtist_ArtistId_fkey"
                        columns: ["ArtistId"]
                        isOneToOne: false
                        referencedRelation: "RecordData"
                        referencedColumns: ["ArtistId"]
                    },
                    {
                        foreignKeyName: "RecordToArtist_ArtistTypeId_fkey"
                        columns: ["ArtistTypeId"]
                        isOneToOne: false
                        referencedRelation: "ArtistType"
                        referencedColumns: ["ArtistTypeId"]
                    },
                    {
                        foreignKeyName: "RecordToArtist_RecordId_fkey"
                        columns: ["RecordId"]
                        isOneToOne: false
                        referencedRelation: "RecordData"
                        referencedColumns: ["RecordId"]
                    },
                    {
                        foreignKeyName: "RecordToArtist_RecordId_fkey"
                        columns: ["RecordId"]
                        isOneToOne: false
                        referencedRelation: "Records"
                        referencedColumns: ["RecordId"]
                    }
                ]
            }
            RecordToGenre: {
                Row: {
                    DateCreated: string
                    DateUpdated: string
                    GenreId: number
                    RecordId: number
                    RecordToGenreId: number
                }
                Insert: {
                    DateCreated?: string
                    DateUpdated?: string
                    GenreId: number
                    RecordId: number
                    RecordToGenreId?: number
                }
                Update: {
                    DateCreated?: string
                    DateUpdated?: string
                    GenreId?: number
                    RecordId?: number
                    RecordToGenreId?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "RecordToGenre_GenreId_fkey"
                        columns: ["GenreId"]
                        isOneToOne: false
                        referencedRelation: "Genres"
                        referencedColumns: ["GenreId"]
                    },
                    {
                        foreignKeyName: "RecordToGenre_RecordId_fkey"
                        columns: ["RecordId"]
                        isOneToOne: false
                        referencedRelation: "RecordData"
                        referencedColumns: ["RecordId"]
                    },
                    {
                        foreignKeyName: "RecordToGenre_RecordId_fkey"
                        columns: ["RecordId"]
                        isOneToOne: false
                        referencedRelation: "Records"
                        referencedColumns: ["RecordId"]
                    }
                ]
            }
        }
        Views: {
            RecordData: {
                Row: {
                    ArtistId: number | null
                    ArtistName: string | null
                    DiscogsUrl: string | null
                    Genres: string | null
                    ImageUrl: string | null
                    RecordId: number | null
                    RecordName: string | null
                    Year: number | null
                }
                Relationships: []
            }
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never