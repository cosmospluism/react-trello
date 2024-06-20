import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    // Todo: [],
    // Done: [],
  },
});

export interface IBoard {
  id: number;
  name: string;
  cards: ITodo[];
}

export const boardState = atom<IBoard[]>({
  key: "board",
  default: [],
});
