import React from 'react';

const Test = ({ posts }) => {
  return (
    <div>
      <h3>데이터 fetch 테스트 페이지입니다.</h3>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid black', marginBottom: '10px' }}>
          <h5>글 제목 : {post.title}</h5>
          <h5>닉네임 : {post.nickname}</h5>
          <h5>글 내용 : {post.content}</h5>
        </div>
      ))}
    </div>
  );
};
export default Test;
