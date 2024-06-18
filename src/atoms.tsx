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
    Todo: [
      { id: 12312, text: "what" },
      { id: 222, text: "the" },
    ],
    Done: [],
    welcome: [],
  },
});

// export const boardState = atom<ITodoState>({
//   key: "board",
//   default: {
//     title: ["sample1", "sample2"],
//   },
// });
