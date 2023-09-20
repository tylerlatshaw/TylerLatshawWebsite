"use client";

import { Button } from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";
import { useSearchParams } from "next/navigation";

export default function CustomSpeedDial() {

    // const searchParams = useSearchParams();
    // const key = searchParams.get("key");

    // if (key === process.env.NEXT_PUBLIC_GYM_AUTH_GUID) {
        return (
            <div className="absolute bottom-8 right-8">
                <div className="absolute bottom-4 right-4 h-fit w-fit group">
                    <Button size="lg" className="bg-green-600 rounded-full shadow-xl transition-transform group-hover:rotate-45">
                        <AddIcon className="text-white h-12 w-12 p-1" />
                    </Button>
                </div>
            </div>
        );
    }

//     return;
// }