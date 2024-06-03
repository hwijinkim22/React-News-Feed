import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

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
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.span`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
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
  /* margin: 75px auto; */
`;
const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);

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
  const nicknameChange = () => {
    alert('hi');
  };
  return (
    <Container>
      <MyPageDiv>마이 페이지</MyPageDiv>

      <Profiles>
        <Profile>
          <Avatar src={user?.user_metadata?.avatar_url || ''} alt="User Avatar" />
        </Profile>
        <Profile>{user?.user_metadata?.nickname || user?.email}</Profile>
        <Profile onClick={nicknameChange}>✒️</Profile>
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
