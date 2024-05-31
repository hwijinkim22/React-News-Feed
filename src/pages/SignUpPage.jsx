import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00");

const SignUpPage = () => {
  const navigate = useNavigate();

  async function signUpWithEmail(email, password) {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      navigate('/login');
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    signUpWithEmail(email, password);
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" name="email" placeholder="이메일" required />
        <input type="password" name="password" placeholder="비밀번호" required />
        <button type="submit">회원가입</button>
      </form>
      <button onClick={() => navigate('/login')}>로그인</button>
    </div>
  );
};

export default SignUpPage;
