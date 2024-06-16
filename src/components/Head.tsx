import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";

const Header = styled.div`
  border-bottom: 2px solid rgba(299, 299, 299, 0.4);
  height: 40px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    li {
      margin-left: 30px;
      color: white;
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  margin-left: 10px;
  h2 {
    font-weight: 700;
    margin-left: 15px;
  }
`;

function Head() {
  return (
    <Header>
      <Title>
        <FontAwesomeIcon icon={faTrello} />
        <h2>Trillo</h2>
      </Title>
      <nav>
        <ul>
          <li>Workspaces ⌵</li>
          <li>Recent ⌵</li>
          <li>Starred ⌵</li>
          <li>Templates ⌵</li>
        </ul>
      </nav>
    </Header>
  );
}

export default Head;
