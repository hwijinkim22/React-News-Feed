// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import Modal from '../components/Modal';
import ImgUpload from '../components/ImgUpload';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const Profiles = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0 auto;
`;

const Profile = styled.span`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nickname = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

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
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;

  cursor: pointer;
`;

const ImgChange = styled.div`
  display: flex;
  position: relative;

  &:hover::after {
    content: '변경';
    position: absolute;
    background-color: #000000ca;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;

    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 1;
    transition: opacity 0.2s;
    cursor: pointer;
  }
`;
const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);
  const [nameModal, setNameModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: posts, error } = await supabase.from('posts').select('id, title').eq('user_id', user.id);
        if (error) {
          console.error('Error fetching posts', error);
        } else {
          setPostList(posts);
        }
      }
    };
    fetchPosts();
  }, []);

  const changeName = () => {
    setNameModal(true);
  };

  return (
    <Container>
      {/* <MyPageDiv>마이 페이지</MyPageDiv> */}

      <Profiles>
        <Profile>
          <ImgChange>
            <Avatar src={user?.user_metadata?.avatar_url || ''} alt="User Avatar" />
          </ImgChange>
        </Profile>
        <Profile>{user?.user_metadata?.nickname || user?.email}</Profile>
        <Profile>
          <Nickname onClick={changeName}>✒️</Nickname>
          {nameModal && (
            <Modal
              open={nameModal}
              close={() => {
                setNameModal(false);
              }}
              user={user}
              setUser={setUser}
            />
          )}
        </Profile>
      </Profiles>

      <Notes>
        {postList.map((post) => {
          return (
            <Note key={post.id}>
              <Content>{post.title}</Content>
            </Note>
          );
        })}
      </Notes>
    </Container>
  );
};

export default MyPage;
