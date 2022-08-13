import styled from "styled-components";

export default function User({ user }) {
  return (
    <UserProfile>
      <img src={user.avatar} alt="avatar" />
      {user.name}
    </UserProfile>
  );
}

const UserProfile = styled.div`
  width: 100%;
  height: 50px;

  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;

  z-index: 15;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
  }
`;
