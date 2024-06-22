import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IBoard, boardState, todoState } from "./atoms";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Head from "./components/Head";
// import DeleteZone from "./components/DeleteZone";
import Boards from "./components/Boards";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Main = styled.div``;

const Main1 = styled.div`
  background-color: rgba(223, 209, 235, 0.3);
  border-bottom: 2px solid rgba(299, 299, 299, 0.4);
  height: 30px;
  padding: 15px 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.input`
  all: unset;
  font-size: 25px;
  font-weight: 700;
  color: white;
  width: 200px;
  &::placeholder {
    color: white;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const Main2 = styled.div`
  display: flex;
  margin: 30px 40px;
`;

const AddButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: rgba(299, 299, 299, 0.5);
  padding: 10px;
  font-size: 15px;
  color: #c7a7d9;
  cursor: pointer;
  transition: all 0.3s;
  &:active {
    background-color: rgba(299, 299, 299, 0.8);
  }
`;

const BoardSample = styled.div<{ $isDragging: boolean }>`
  background-color: ${(props) =>
    props.$isDragging ? "#DFD3EF" : "rgba(299, 299, 299, 0.55)"};
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  height: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-right: 20px;
  input {
    border: none;
    padding: 5px;
    text-indent: 10px;
    outline: none;
    background-color: transparent;
    font-size: 18px;
    &:focus::placeholder {
      color: transparent;
    }
  }
`;

const BoardContainer = styled.div`
  display: flex;
`;

interface IUsername {
  username: string;
}

function App() {
  const [boards, setBoards] = useRecoilState(boardState);
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    // 같은 보드 내에서 이동하기
    if (destination.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const todoCopy = [...allBoards[source.droppableId]];
        const todoObj = todoCopy[source.index];
        todoCopy.splice(source.index, 1);
        todoCopy.splice(destination.index, 0, todoObj);
        return {
          ...allBoards,
          [source.droppableId]: todoCopy,
        };
      });
    }
    // 다른 보드 간 이동하기
    if (destination.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const destinationCopy = [...allBoards[destination.droppableId]];
        const sourceObj = sourceCopy[source.index];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, sourceObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }

    // 삭제 구역으로 이동 (삭제)
    // if (destination.droppableId === "delete_zone") {
    //   setTodos((allBoards) => {
    //     const todoCopy = [...allBoards[source.droppableId]];
    //     todoCopy.splice(source.index, 1);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: todoCopy,
    //     };
    //   });
    // }
  };

  const addBoard = () => {
    const newBoard: IBoard = {
      id: boards.length + 1,
      name: "board name",
      cards: [],
    };
    setBoards([...boards, newBoard]);
  };

  const { register, handleSubmit } = useForm<IUsername>();
  const [username, setUsername] = useState("");
  const handleSubmitUsername = (data: any) => {
    setUsername(data);
  };
  console.log(username);

  return (
    <div>
      <Head />
      <Main>
        <Main1>
          <form onSubmit={handleSubmit(handleSubmitUsername)}>
            <UserName
              value={username}
              {...register("username")}
              placeholder="write your name"
            />
            <h3></h3>
          </form>
          <AddButton onClick={addBoard}>+ New Board</AddButton>
        </Main1>
        <Main2>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* <Droppable droppableId="dropBoard">
              {(drop, index) => (
                <div ref={drop.innerRef} {...drop.droppableProps}>
                  <Draggable draggableId={index + ""} index={+index}>
                    {(drag, snapshot) => (
                      <BoardContainer>
                        {boards.map((board) => (
                          <BoardSample
                            key={board.id}
                            ref={drag.innerRef}
                            {...drag.dragHandleProps}
                            {...drag.draggableProps}
                            $isDragging={snapshot.isDragging}
                          >
                            <form>
                              <input type="text" placeholder="board name" />
                            </form>
                          </BoardSample>
                        ))}
                      </BoardContainer>
                    )}
                  </Draggable>
                  {drop.placeholder}
                </div>
              )}
            </Droppable> */}

            {Object.keys(todos).map((boardId) => (
              <Boards todos={todos[boardId]} boardId={boardId} key={boardId} />
            ))}
            {/* <DeleteZone /> */}
          </DragDropContext>
        </Main2>
      </Main>
    </div>
  );
}

export default App;

// {boards &&
//   boards.map((board) => (
//     <BoardSample key={board.id}>
//       <form onSubmit={onSubmitBoardName}>
//         <input type="text" placeholder="board name" />
//       </form>
//     </BoardSample>
//   ))}
