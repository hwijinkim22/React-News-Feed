import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const CommitDetail = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.post) {
      const { post } = location.state;
      setTitle(post.title);
      setContent(post.content);
      setEditId(post.id);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      if (editId) {
        await supabase
          .from('posts')
          .update({ title, content })
          .eq('id', editId);
      } else {
        await supabase
          .from('posts')
          .insert([{ title, content, user_id: user.id }]);
      }
      navigate('/test');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const handleCancel = () => {
    navigate('/test');
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <ButtonGroup>
          <Button type="submit">{editId ? '수정' : '등록'}</Button>
          <Button type="button" onClick={handleCancel}>취소</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CommitDetail;
