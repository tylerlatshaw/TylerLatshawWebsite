import SpeedDial from "@/components/gym/speed-dial";
import WorkoutTable from "@/components/gym/workout-table";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | string } }) {

    if (searchParams.key === process.env.GYM_AUTH_GUID) {
        return <>
            <div className="h-full w-full">
                <div className="container w-full md:w-4/5 xl:w-3/5 mx-auto p-6">

                    <div className="flex w-full">
                        <h1 className="text-4xl mx-auto text-white my-6">Gym Record</h1>
                    </div>

                    <WorkoutTable />
                </div>
            </div>
            <SpeedDial />
        </>;
    }

    return <>
        <div className="h-full w-full">
            <div className="container w-full md:w-4/5 xl:w-3/5 mx-auto p-6">

                <div className="flex w-full">
                    <h1 className="text-4xl mx-auto text-white my-6">Gym Record</h1>
                </div>

                <WorkoutTable />
            </div>
        </div>
    </>;
}