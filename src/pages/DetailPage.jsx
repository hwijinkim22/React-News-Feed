import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  * {
    padding: 0;
    margin: 0;
  }

  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  & h1 {
    font-size: 28px;
    font-weight: bold;
  }

  .detail__wrap {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    .detail__post__ul {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .detail__post__list {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;

      .post__list__content > *:not(:first-child) {
        margin-top: 12px;
      }

      > img {
        width: 340px;
        height: 140px;
        margin-right: 50px;
      }

      .post__title {
        font-size: 20px;
        font-weight: 500;
      }

      .user__name {
        font-size: 14px;
        font-weight: 400;
        color: #8e8e8e;
      }

      .post__date {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }

  .post__content__box {
    border: 1px solid #000000;
    min-height: 800px;
    padding: 40px;
  }

  .detail__post__btns {
    display: flex;

    > button {
      padding: 0 20px;
      width: 100px;
      height: 35px;
      border: none;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    > button:last-child {
      margin-left: 10px;
    }
  }
`;


const DetailPage = () => {

  // detailpage 기능 추가 (김병준)
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  console.log('아이템 홈에서 넘겨 받은 내용:', item)

  if (!item) {
    return <p>Loading...</p>;
  }

  const handleEdit = () => {
    navigate('/commitdetail', { state: { item } });
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?')) {
      await supabase.from('posts').delete().eq('id', item.id);
      alert('삭제되었습니다.');
      navigate('/');
    }
  };
  
  // 글쓴 시각 포매팅 함수 (김병준)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  };

  return (
    <Wrap>
      {/* <Link to="/CommitDetail"> CommitDetail </Link> */}

      <div className="detail__wrap">
        <h1>상세페이지</h1>

        <div className="detail__post__ul">
          <div className="detail__post__list">
            <img src="https://placehold.co/340x140" />

            <div className="post__list__content">
              <p className="post__title">{item.title}</p>
              <p className="post__user__name">{item.nickname}</p>
              <p className="post__date">{formatDate(item.created_at)}</p>
            </div>
          </div>

          <div className="detail__post__btns">
            <button className="post__btn--modify" onClick={handleEdit}>수정</button>
            <button className="post__btn--delete" onClick={handleDelete}>삭제</button>
          </div>
        </div>

        <div className="post__content__box">
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    </Wrap>
  );
};

export default DetailPage;
