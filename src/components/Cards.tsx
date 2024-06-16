import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Card = styled.div<{ $isDragging: boolean }>`
  background-color: ${(props) => (props.$isDragging ? "#DFD3EF" : "white")};
  padding: 20px 15px;
  border-radius: 7px;
  margin-bottom: 10px;
`;

interface ICardsProps {
  todoText: string;
  index: number;
}

function Cards({ todoText, index }: ICardsProps) {
  return (
    <Draggable key={todoText} draggableId={todoText} index={index}>
      {(drag, snapshot) => (
        <Card
          ref={drag.innerRef}
          {...drag.dragHandleProps}
          {...drag.draggableProps}
          $isDragging={snapshot.isDragging}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default Cards;
