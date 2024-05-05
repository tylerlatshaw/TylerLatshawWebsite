import type { RecordDataType } from "@/app/lib/type-library";
import VinylRecordCard from "./vinyl-record-card";

export default function VinylRecordContainer() {

    async function getRecordData() {
        const res = await fetch(process.env.BASE_URL + "/api/get-record-data");
        const data = await res.json();

        return data;
    }

    async function generateRecordCard() {
        const data: RecordDataType[] = await getRecordData();

        return <>
            {
                data.map((record) => {
                    return <>
                        <div key={record.RecordId} className="flex items-stretch">
                            {
                                VinylRecordCard(record)
                            }
                        </div>
                    </>;
                })
            }
        </>;
    }

    return <>
        {
            generateRecordCard()
        }
    </>;
}