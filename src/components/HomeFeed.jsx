import React, { useState } from 'react';
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
  border: 8px solid #343434;
  border-radius: 15px;
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
  border-radius: 5px;
`;

const MoreButton = styled.button`
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 600px;
  padding: 10px 20px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  margin-left: 600px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HomeFeed = ({ posts }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const moveDetailPage = () => {
    navigate('/detailpage');
  };

  return (
    <div>
      <HomeContent>
        {posts.slice(0, showAll ? posts.length : 9).map((post) => (
          <HomePost key={post.id} onClick={moveDetailPage}>
            <h5>글 제목 : {post.title}</h5>
            <h5>닉네임 : {post.nickname}</h5>
            <HomePostContent>{post.content}</HomePostContent>
          </HomePost>
        ))}
      </HomeContent>
      {showAll ? (
        <CloseButton onClick={() => setShowAll(false)}>닫기</CloseButton>
      ) : (
        <MoreButton onClick={() => setShowAll(true)}>더보기</MoreButton>
      )}
    </div>
  );
};

export default HomeFeed;
