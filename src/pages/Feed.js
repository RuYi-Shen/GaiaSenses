import styled from "styled-components";

function Feed() {
  return (
    <Main>
      <h1>Feed</h1>
    </Main>
  );
}

export default Feed;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white-base);
  font-size: 30px;
  background-color: var(--black-base);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
