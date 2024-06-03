import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  margin: 50px auto;
  border: 5px solid #4854847c;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const supabase = createClient(
  'https://nozekgjgeindgyulfapu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00'
);

const LoginPage = () => {
  const navigate = useNavigate();

  async function signInWithGithub() {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) {
      console.error('깃허브 로그인 에러', error.message);
      alert('로그인 오류가 발생하였습니다, 다시 시도해주세요.');
    }

    const { user } = data;
    if (!user) {
      alert('회원가입이 필요합니다.');
      navigate('/signup');
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // navigate('/');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <Container>
      <Title>로그인 페이지</Title>
      <Form>
        <Label htmlFor="email">아이디:</Label>
        <Input type="text" id="email" name="email" />
        <Label htmlFor="password">비밀번호:</Label>
        <Input type="text" id="password" name="password" />
      </Form>
      <Button onClick={signInWithGithub}>GitHub로 로그인</Button>
      <Button onClick={() => navigate('/signup')}>회원가입</Button>
    </Container>
  );
};

export default LoginPage;
