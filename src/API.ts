import { shuffleArray } from "./utils";

// export type Question = {
//     category : String;
//     correct_answer : String;
//     difficulty : String;
//     incorrect_answers : String[];
//     question : String;
//     type : String;
// };

export type Question = {
    category : string;
    correct_answer : string;
    difficulty : string;
    incorrect_answers : string[];
    question : string;
    type : string;
};

export type QuestionState = Question & { answers : string[] };

// export enum Difficulty {
//     EASY = 'easy',
//     MEDIUM = 'medium',
//     HARD = 'hard',
// }
export const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
} as const;

export type Difficulty =
    (typeof Difficulty)[keyof typeof Difficulty];

export const fetchQuestions = async (amount : number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await( await fetch(endpoint)).json();
    // console.log(data);
    return data.results.map((question : Question) => ({
        ...question,
        answers : shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}
