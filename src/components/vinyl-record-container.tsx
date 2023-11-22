"use client";

import setRecordCard from "@/components/vinyl-record-card";
import { RecordData } from "@/database/records";
import axios from "axios";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export default function Page() {
    const [records, setRecords] = useState<RecordData[]>([]);

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