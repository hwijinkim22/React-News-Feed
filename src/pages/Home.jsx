import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding-top: 60px;
`;

const HomeHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #343434;
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
`;

const HomeHeaderBtns = styled.div`
  position: absolute;
  right: 20px;
  display: ${(props) => (props.hide ? 'none' : 'flex')};
`;

const HomeHeaderBtn = styled.button`
  margin-right: 50px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);

  const checkZoom = () => {
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    setHideButtons(zoomLevel >= 150);
  };

  useEffect(() => {
    window.addEventListener('resize', checkZoom);
    checkZoom();

    return () => {
      window.removeEventListener('resize', checkZoom);
    };
  }, []);

  return (
    <HomeContainer>
      <HomeHeader>
        <SearchInput type="text" placeholder="내용을 입력하세요!" />
        <HomeHeaderBtns hide={hideButtons}>
          <HomeHeaderBtn>로그인</HomeHeaderBtn>
          <HomeHeaderBtn>마이페이지</HomeHeaderBtn>
        </HomeHeaderBtns>
      </HomeHeader>
      <div>
        <h1>Welcome to Home Page</h1>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
        <p>Here is some content...</p>
      </div>
    </HomeContainer>
  );
};

export default Home;
