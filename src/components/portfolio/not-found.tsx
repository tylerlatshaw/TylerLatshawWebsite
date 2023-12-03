import { Alert, AlertTitle } from "@mui/material";
import PortfolioGallery from "./portfolio-gallery";

export default function NotFound() {

    return (
        <>
            <div className="w-full mb-12">
                <Alert variant="outlined" severity="info">
                    <AlertTitle>Portfolio Not Found</AlertTitle>
                    Sorry, that portfolio does not exist. Please view one of the documents below instead.
                </Alert>
            </div>

            <PortfolioGallery />
        </>
    );
}