import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

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

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const ContentContainer = styled.div`
  white-space: pre-wrap;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const Test = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    const fetchPosts = async () => {
      const { data: posts } = await supabase.from('posts').select('*');
      setPosts(posts);
    };

    getUser();
    fetchPosts();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [posts]);

  const handleEdit = (post) => {
    if (currentUser && currentUser.id === post.user_id) {
      navigate('/commitdetail', { state: { post } });
    } else {
      alert('권한이 없습니다.');
    }
  };

  const handleDelete = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (currentUser && currentUser.id === post.user_id) {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        alert('게시글이 삭제되었습니다.');
        await supabase
          .from('posts')
          .delete()
          .eq('id', postId);
        const { data: posts } = await supabase.from('posts').select('*');
        setPosts(posts);
      }
    } else {
      alert('권한이 없습니다.');
    }
  };

  return (
    <Container>
      <h3>데이터 fetch 테스트 페이지입니다.</h3>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <h5>글 제목: {post.title}</h5>
          <h5>닉네임: {currentUser?.user_metadata?.name || post.display_name}</h5>
          <h5>글 내용</h5>
          <ContentContainer dangerouslySetInnerHTML={{ __html: post.content }} />
          {currentUser && currentUser.id === post.user_id && (
            <div>
              <Button onClick={() => handleEdit(post)}>수정</Button>
              <DeleteButton onClick={() => handleDelete(post.id)}>삭제</DeleteButton>
            </div>
          )}
        </PostCard>
      ))}
    </Container>
  );
};

export default Test;
