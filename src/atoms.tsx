import { atom } from "recoil";

export interface ITodo {
  [key: string]: string[];
}

export const todoState = atom<ITodo>({
  key: "todo",
  default: {
    Todo: ["what", "the", "hey"],
    Done: ["hell", "damn"],
    welcome: ["nothing", "cooool", "woow"],
    what: ["happened"],
  },
});
