import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "YOUR_SUPABASE_KEY");

const SignUpPage = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    setIsSubmitting(false);
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <form id="signUpForm" onSubmit={handleSignUp}>
        <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
        <button type="submit" disabled={isSubmitting}>GitHub로 회원가입</button>
      </form>
      <button onClick={() => navigate('/login')}>로그인</button>
    </div>
  );
};

export default SignUpPage;
