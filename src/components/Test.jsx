import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PostCard = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Test = ({ posts }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    getUser();
  }, []);

  const handleEdit = (post) => {
    navigate('/commitdetail', { state: { post } });
  };

  const handleDelete = async (postId) => {
    await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <Container>
      <h3>데이터 fetch 테스트 페이지입니다.</h3>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <h5>글 제목: {post.title}</h5>
          <h5>닉네임: {post.display_name}</h5>
          <h5>글 내용: {post.content}</h5>
          {currentUser && currentUser.id === post.user_id && (
            <div>
              <Button onClick={() => handleEdit(post)}>수정</Button>
              <Button onClick={() => handleDelete(post.id)}>삭제</Button>
            </div>
          )}
        </PostCard>
      ))}
    </Container>
  );
};

export default Test;
