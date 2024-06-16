import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Cards";
import DeleteZone from "./DeleteZone";

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
  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

interface IBoard {
  boardId: string;
  todos: string[];
}

function Boards({ todos, boardId }: IBoard) {
  return (
    <Container>
      <Droppable droppableId={boardId}>
        {(drop) => (
          <Board ref={drop.innerRef} {...drop.droppableProps}>
            <h3>{boardId}</h3>
            {todos.map((todo, index) => (
              <Cards key={index} todoText={todo} index={index} />
            ))}
            {drop.placeholder}
          </Board>
        )}
      </Droppable>
      <DeleteZone />
    </Container>
  );
}

export default Boards;
