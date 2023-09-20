"use client";

import { Button } from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";

export default function CustomSpeedDial() {
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