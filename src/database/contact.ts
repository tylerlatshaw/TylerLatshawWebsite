import { supabase } from "@/utilities/supabase";

import type { EmailDataType } from "@/app/lib/type-library";

export async function addContactMessage(messageData: EmailDataType) {
    const data = await supabase
        .from("Contact")
        .insert({
            Name: messageData.name,
            Email: messageData.email,
            Message: messageData.message,
            ReferringPage: messageData.referringPage,
            FormSource: messageData.source
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