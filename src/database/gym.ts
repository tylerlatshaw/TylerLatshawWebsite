import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getWorkoutTableData() {
    const tableData = await prisma.$queryRaw`SELECT MG.Name AS 'MuscleGroup',
    W.Name AS 'Workout'
            ,W.MaxWeight
            ,DATE_FORMAT(W.WorkoutDate, '%c/%e/%y') AS 'WorkoutDate'
        FROM Workout W
        INNER JOIN (
            SELECT Name
                ,MAX(MaxWeight) AS 'MaxWeight'
            FROM Workout
            GROUP BY Name
        ) IJ 
        ON W.Name = IJ.Name 
        AND W.MaxWeight = IJ.MaxWeight
        LEFT JOIN WorkoutToMuscleGroup WTG
        ON W.WorkoutId = WTG.WorkoutId
        LEFT JOIN MuscleGroup MG
        ON WTG.MuscleGroupId = MG.MuscleGroupId
        ORDER BY W.Name;`;

    return tableData;
}

export type MuscleGroups = {
    MuscleGroupId: number
    Name: string
}

export async function getMuscleGroups() {
    const muscleGroups = await prisma.muscleGroup.findMany({
        select: {
            MuscleGroupId: true,
            Name: true,
        },
        distinct: ["Name"],
        orderBy: [
            {
                Name: "asc",
            }
        ],
    });

    return muscleGroups;
}

export type NewWorkout = {
    date: Date,
    dateTime: string,
    muscleGroup: number,
    workoutName: string,
    weight: number,
}

export async function addNewWorkout(formData: NewWorkout) {
    const newWorkout = await prisma.workout.create({
        data: {
            Name: formData.workoutName,
            MaxWeight: formData.weight,
            WorkoutDate: formData.date,
        },
    });

    await prisma.workoutToMuscleGroup.create({
        data: {
            WorkoutId: newWorkout.WorkoutId,
            MuscleGroupId: formData.muscleGroup,
        },
    });
}