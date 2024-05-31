import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00");

const SignUpPage = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  // 기본 프로필 이미지 URL 설정
  const { data: defaultAvatarData } = supabase.storage
    .from('profile')
    .getPublicUrl('default-profile.jpg');

  const defaultAvatarUrl = defaultAvatarData.publicUrl;

  const getErrorMessage = (error) => {
    switch (error.message) {
      case "Password should be at least 6 characters.":
        return "비밀번호는 최소 6자 이상이어야 합니다.";
      case "User already registered":
      case "Email already registered":
        return "이미 등록된 이메일입니다.";
      case "Invalid email address":
        return "유효하지 않은 이메일 주소입니다. 이메일 주소 형식을 확인해주세요.";
      case "Email rate limit exceeded":
        return "회원가입 요청을 너무 많이 하셨습니다. 잠시 후 다시 시도해주세요.";
      default:
        return "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
    }
  };

  async function signUpWithEmail(email, password, avatarUrl) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('회원 가입 중 다음과 같은 에러가 발생함:', error);
      alert(getErrorMessage(error));  // 에러 메시지를 사용자에게 알림
      return;
    }

    const user = data.user;
    if (!user) {
      console.error('회원가입에 실패하였습니다.');
      return;
    }

    console.log('새로운 회원가입이 이루어졌습니다.:', user);
    // 사용자 프로필 데이터 추가
    await supabase.from('profiles').insert([
      { id: user.id, username: email, avatar_url: avatarUrl }
    ]);
    navigate('/login');
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    
    let avatarUrl = defaultAvatarUrl; // 기본 프로필 이미지 URL

    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`public/${avatarFile.name}`, avatarFile);

      if (error) {
        console.error('Error uploading avatar:', error);
        alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      } else {
        avatarUrl = supabase.storage
          .from('profile')
          .getPublicUrl(`public/${avatarFile.name}`).data.publicUrl;
      }
    }

    signUpWithEmail(email, password, avatarUrl);
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" name="email" placeholder="이메일" required />
        <input type="password" name="password" placeholder="비밀번호" required />
        <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
        <button type="submit">회원가입</button>
      </form>
      <button onClick={() => navigate('/login')}>로그인</button>
    </div>
  );
};

export default SignUpPage;
