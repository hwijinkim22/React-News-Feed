import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContent = styled.div`
  margin-top: 100px;
  margin-left: 40px;
  margin-bottom: 40px;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  border: 5px solid black;
`;

const HomePostContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HomePost = styled.div`
  margin: 10px;
  border: 2px solid black;
  width: 300px;
  padding: 10px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const HomeFeed = ({ posts }) => {
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate('/detailpage');
  };

  return (
    <div>
      <HomeContent>
        {posts.map((post) => (
          <HomePost key={post.id} onClick={moveDetailPage}>
            <h5>글 제목 : {post.title}</h5>
            <h5>닉네임 : {post.nickname}</h5>
            <HomePostContent>{post.content}</HomePostContent>
          </HomePost>
        ))}
      </HomeContent>
    </div>
  );
};

export default HomeFeed;
