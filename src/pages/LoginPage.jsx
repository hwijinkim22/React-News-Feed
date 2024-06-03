import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "YOUR_SUPABASE_KEY");

const LoginPage = () => {
  const navigate = useNavigate();

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div>
      <h2>로그인 페이지</h2>
      <button onClick={signInWithGithub}>GitHub로 로그인</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
};

export default LoginPage;
