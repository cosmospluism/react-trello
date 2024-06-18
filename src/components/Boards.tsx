import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Cards";
import DeleteZone from "./DeleteZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { ITodo, todoState } from "../atoms";
import { useForm } from "react-hook-form";

const Container = styled.div`
  margin-right: 20px;
  overflow: hidden;
`;

const Board = styled.div`
  background-color: rgba(299, 299, 299, 0.55);
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  height: 400px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    text-indent: 10px;
    font-size: 15px;
    margin-top: 10px;
    &::placeholder {
      color: #af91d6;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
`;

const BoardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    text-indent: 10px;
  }
  svg {
    margin-right: 5px;
    color: gray;
  }
`;

interface IBoard {
  boardId: string;
  todos: ITodo[];
}

function Boards({ todos, boardId }: IBoard) {
  const [todo, setTodo] = useRecoilState(todoState);
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <Droppable droppableId={boardId}>
        {(drop) => (
          <Board ref={drop.innerRef} {...drop.droppableProps}>
            <BoardTitle>
              <h3>{boardId}</h3>
              <FontAwesomeIcon icon={faEllipsis} />
            </BoardTitle>
            {todos.map((todo, index) => (
              <Cards
                key={todo.id}
                todoText={todo.text}
                index={index}
                todoId={todo.id}
              />
            ))}
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("registerTodo", { required: true })}
                type="text"
                placeholder="+ Add a card"
              />
            </form>
            {drop.placeholder}
          </Board>
        )}
      </Droppable>
      <DeleteZone />
    </Container>
  );
}

export default Boards;
