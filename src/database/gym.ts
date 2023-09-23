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

export async function getMuscleGroups() {
    const muscleGroups = await prisma.muscleGroup.findMany({});

    return muscleGroups;
}

/*

SELECT MG.Name AS 'MuscleGroup',
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
    ORDER BY W.Name;
    */