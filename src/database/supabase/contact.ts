import { supabase } from "@/utilities/supabase";

import type { EmailData } from "@/app/lib/type-library";

export async function addContactMessage(messageData: EmailData) {
    const {
        name,
        email,
        message,
        referringPage,
        source
    } = messageData;

    await supabase
        .from("Contact")
        .insert({
            Name: name,
            Email: email,
            Message: message,
            ReferringPage: referringPage,
            FormSource: source
        })
        .select();
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