import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import supabase from "../supabaseClient";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #343434;

  &:hover {
    background-color: #1f1f1f;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  height: 200px;
  resize: vertical;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CommitDetail = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
      setTitleError('제목은 최대 20자까지 작성 가능합니다.');
    } else {
      setTitleError('');
    }
    setTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (title.length > 20) {
      setTitleError('제목은 최대 20자까지 작성 가능합니다.');
      valid = false;
    } else if (title.length === 0) {
      setTitleError('제목을 입력해주세요.');
      valid = false;
    }

    if (content.length === 0) {
      setContentError('내용을 입력해주세요.');
      valid = false;
    } else {
      setContentError('');
    }

    if (valid && user) {
      if (window.confirm('정말 등록하시겠습니까?')) {
        const { data, error } = await supabase.from('posts').insert([{ title, content, user_id: user.id }]);
        if (error) {
          alert(`Error inserting data: ${error.message}`);
          navigate('/test');
        } else {
          alert('등록되었습니다');
          navigate('/test');
        }
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm('정말 취소하시겠습니까? 글 작성을 취소하시면 작성하신 내용이 모두 삭제되고 홈으로 이동됩니다.')) {
      navigate('/test');
    }
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          required
        />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
        <Textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
        <ButtonGroup>
          <Button type="submit">등록</Button>
          <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CommitDetail;
