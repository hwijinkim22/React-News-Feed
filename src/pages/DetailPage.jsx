import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <Wrap>
      <Link to="/CommitDetail"> CommitDetail </Link>

      <div className="detail__wrap">
        <h1>상세페이지</h1>

        <div className="detail__post__ul">
          <div className="detail__post__list">
            <img src="https://placehold.co/340x140" />

            <div className="post__list__content">
              <p className="post__title">게시글 제목</p>
              <p className="post__user__name">글쓴이</p>
              <p className="post__date">게시글 작성일</p>
            </div>
          </div>

          <div className="detail__post__btns">
            <button className="post__btn--modify">수정</button>
            <button className="post__btn--delete">삭제</button>
          </div>
        </div>

        <div className="post__content__box">
          <p>
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
            내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          </p>
        </div>
      </div>
    </Wrap>
  );
};

export default DetailPage;
