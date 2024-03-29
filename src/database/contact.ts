import { supabase } from "@/utilities/supabase";

import type { EmailDataType } from "@/app/lib/type-library";

export async function addContactMessage(messageData: EmailDataType) {
    const {
        name,
        email,
        message,
        referringPage,
        source
    } = messageData;

    const data = await supabase
        .from("Contact")
        .insert({
            Name: name,
            Email: email,
            Message: message,
            ReferringPage: referringPage,
            FormSource: source
        })
        .select();

        return data;
}

export async function getContactEmail(email: string, source: string) {
    const { data } = await supabase
        .from("Contact")
        .select("Email, FormSource")
        .match({
            Email: email,
            FormSource: source
        });

    return data;
}