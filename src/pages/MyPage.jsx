// import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const MyPageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  border-bottom: 1px solid gray;
  padding: 10px;
`;

const Profiles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 50px;
`;

const Profile = styled.span`
  padding: 5px;
`;

// const List = styled.div`
//   border-bottom: 1px solid gray;
//   margin: 100px;
// `;
const Notes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  margin: 100px auto;
`;
const Note = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  background-color: #d9d9d9;
`;
const MyPage = () => {
  // const { myPageId } = useParams;

  return (
    <Container>
      <MyPageDiv>마이 페이지</MyPageDiv>

      <Profiles>
        <Profile>
          <img src="../../public/iconmonstr-user-circle-thin-48.png" alt="" />
        </Profile>
        <Profile>LunaBloom</Profile>
        <Profile>✒️</Profile>
      </Profiles>

      {/* <List></List> */}

      <Notes>
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </Notes>
    </Container>
  );
};

export default MyPage;
