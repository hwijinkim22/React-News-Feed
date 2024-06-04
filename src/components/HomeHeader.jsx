import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homeimage from '../image/homeimage.png';
import CommitDetail from '../pages/CommitDetail';

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #343434;
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
`;

const HeaderBtns = styled.div`
  position: absolute;
  right: 20px;
  display: ${(props) => (props.hide === 'true' ? 'none' : 'flex')};
`;

const HeaderBtn = styled.button`
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

const HomeImage = styled.img`
  position: absolute;
  left: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: ${(props) => (props.hide === 'true' ? 'none' : 'flex')};
`;

const HomeHeader = ({ signIn, signOut }) => {
  const [hideButtons, setHideButtons] = useState(false);

  const checkZoom = () => {
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    //이 비율에 100을 곱하고 소수점을 반올림하여 줌 레벨을 백분율로 계산, 줌 레벨이 150%라면 이 값은 150이 됨
    setHideButtons(zoomLevel >= 150);
  };

  // window.outerWidth 브라우저 창의 외부 너비를 픽셀 단위로 반환. 브라우저 창의 전체 너비(스크롤바와 도구 모음 포함)
  // window.innerWidth 브라우저 창의 내부 너비를 픽셀 단위로 반환. 이는 스크롤바를 제외한 창의 콘텐츠 영역의 너비

  useEffect(() => {
    window.addEventListener('resize', checkZoom);
    checkZoom();

    return () => {
      window.removeEventListener('resize', checkZoom);
    };
  }, []);

  const navigate = useNavigate();

  const moveMyPage = () => {
    navigate('/mypage');
  };

  const moveHome = () => {
    navigate('/');
  };

  const moveLogin = () => {
    navigate('/login');
  };

  const moveCommitDetail = () => {
    console.log("Before signIn=", signIn);
    navigate('/commitdetail');
    console.log("After signIn=", signIn);
  }

  return (
    <>
      <Header>
        <HomeImage src={homeimage} onClick={moveHome} hide={hideButtons ? 'true' : 'false'} />
        <p style={{ color: 'blue' }}>Our Knowledge</p>
        <HeaderBtns hide={hideButtons ? 'true' : 'false'}>
          {signIn ? (
            <>
            <HeaderBtn onClick={signOut}>로그아웃</HeaderBtn>
            <HeaderBtn onClick={moveCommitDetail}>글쓰기</HeaderBtn>
            </>
          ) : (
            <HeaderBtn onClick={moveLogin}>로그인</HeaderBtn>
          )}
          <HeaderBtn onClick={moveMyPage}>마이페이지</HeaderBtn>
        </HeaderBtns>
      </Header>
    </>
  );
};

export default HomeHeader;
