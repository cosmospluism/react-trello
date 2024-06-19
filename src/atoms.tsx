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
    Todo: [],
    Done: [],
  },
});

// export const boardState = atom({
//   key: "board",
//   default: {
//     board: [{}],
//   },
// });
