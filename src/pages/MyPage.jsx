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
  justify-content: flex-start;
  margin: 100px auto;
`;
const Note = styled.div`
  display: flex;
  flex-direction: column;
  width: 15.625rem;
  height: 15.625rem;
  background-color: #d9d9d9;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  /* margin: 75px auto; */
`;
const MyPage = ({ posts }) => {
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
        {posts.map((post) => {
          return (
            <Note key={post.id}>
              <Content>{post.content}</Content>
            </Note>
          );
        })}
      </Notes>
    </Container>
  );
};

export default MyPage;
