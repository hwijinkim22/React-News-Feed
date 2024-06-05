import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeInput from './HomeInput';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeContent = styled.div`
  margin-top: 40px;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const HomePost = styled.div`
  position: relative;
  margin-top: 10px;
  width: 500px;
  height: 500px;
  margin: 10px;
  border: 2px solid black;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const HomePostImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const HomePostOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #343434;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const HomePostTitle = styled.h5`
  margin: 0;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
`;

const HomePostNickname = styled.h5`
  margin: 0;
  font-size: 14px;
`;

const HomePostContent = styled.p`
  margin: 5px 0 0;
  font-size: 16px;
`;

const MoreButton = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HomeFeed = ({ posts }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [searchFeed, setSearchFeed] = useState('');

  // HomeFeed 컴포넌트에서 DetailPage 컴포넌트로 item을 id로 넘기는 함수
  const handleItemSelect = (id) => {
    const item = posts.find((item) => item.id === id);
    navigate('/detailpage', { state: { item } });
  };

  const handleSearch = (feed) => {
    setSearchFeed(feed);
  };

  const filterdPosts = posts.filter(
    (post) =>
      post.title.toString().includes(searchFeed) || post.content.toLowerCase().includes(searchFeed.toLowerCase())
  );

  return (
    <Container>
      <HomeInput onSearch={handleSearch} />
      <HomeContent>
        {filterdPosts.slice(0, showAll ? filterdPosts.length : 9).map((post) => (
          <HomePost key={post.id} onClick={() => handleItemSelect(post.id)}>
            <HomePostImage dangerouslySetInnerHTML={{ __html: post.content }} />
            <HomePostOverlay>
              <HomePostTitle>{post.title}</HomePostTitle>
              <HomePostNickname>{post.nickname}</HomePostNickname>
              <HomePostContent>{post.content}</HomePostContent>
            </HomePostOverlay>
          </HomePost>
        ))}
      </HomeContent>
      {showAll ? (
        <CloseButton onClick={() => setShowAll(false)}>닫기</CloseButton>
      ) : (
        <MoreButton onClick={() => setShowAll(true)}>더보기</MoreButton>
      )}
    </Container>
  );
};

export default HomeFeed;
