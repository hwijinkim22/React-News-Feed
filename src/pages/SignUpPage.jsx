import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';

const supabase = createClient(
  'https://nozekgjgeindgyulfapu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00'
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname
          }
        }
      });

      if (error) {
        throw error;
      }

      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류 발생', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });

      if (error) {
        throw error;
      }

      navigate('/');
    } catch (error) {
      console.error('GitHub 로그인 중 오류 발생:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>회원가입 페이지</Title>
      <Form onSubmit={signUpWithEmail}>
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </Form>
      <Button onClick={handleSignUp} disabled={isSubmitting}>
        {isSubmitting ? '로딩 중...' : 'GitHub로 회원가입'}
      </Button>
      <Button onClick={() => navigate('/login')}>로그인</Button>
    </Container>
  );
};

export default SignUpPage;
