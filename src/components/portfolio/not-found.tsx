"use client";

import { Alert, AlertTitle } from "@mui/material";

export default function NotFound() {

    return (
        <>
            <div className="w-full">
                <Alert variant="outlined" severity="info">
                    <AlertTitle>Portfolio Not Found</AlertTitle>
                    Sorry, that portfolio does not exist. Please view one of the documents below instead.
                </Alert>
            </div>
        </>
    );
}