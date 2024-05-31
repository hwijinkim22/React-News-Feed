import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00");

const LoginPage = () => {
  const navigate = useNavigate();

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  return (
    <div>
      <h2>로그인 페이지</h2>
      <button onClick={signInWithGithub}>GitHub로 로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
};

export default LoginPage;
