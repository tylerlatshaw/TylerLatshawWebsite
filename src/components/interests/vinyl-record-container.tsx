"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import setRecordCard from "@/components/interests/vinyl-record-card";

import type { RecordDataType } from "@/app/lib/type-library";

export default function Page() {
    const [records, setRecords] = useState<RecordDataType[]>([]);

    useEffect(() => {
        axios.get("/api/dev-get-record-data").then((response) => {
            setRecords(response.data);
        });
    }, []);

    return <>
        {records.map((record) => (
            <div key={record.RecordId} className="flex items-stretch">
                {setRecordCard(record)}
            </div>
        ))}
    </>;
}