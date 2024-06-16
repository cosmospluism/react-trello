import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeletePart = styled.div`
  width: 100px;
  height: 100px;
  svg {
    position: absolute;
    bottom: 50px;
    right: 50px;
    font-size: 70px;
    color: white;
  }
`;

function DeleteZone() {
  return (
    <Droppable droppableId="delete_zone">
      {(drop) => (
        <DeletePart ref={drop.innerRef} {...drop.droppableProps}>
          <FontAwesomeIcon icon={faTrash} />
          {drop.placeholder}
        </DeletePart>
      )}
    </Droppable>
  );
}

export default DeleteZone;
