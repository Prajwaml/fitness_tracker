import myFetch, { User } from "./myFetch";

export let AddedExercise = [];

export async function getExercise(currentEmail) {
    const exercise = await myFetch('/exercise/getExercise', { currentEmail });
    return AddedExercise = exercise;
}

export async function addExercise(exerciseList) {
    const addExercise = await myFetch('/exercise/newExercise', { exerciseList });

    return AddedExercise = addExercise;
}