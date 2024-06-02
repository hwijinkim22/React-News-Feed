// 지금은 협업 초기로 비교적 자세하게 주석을 달았습니다.
// merge하는 과정에서는 필요한 주석만 남기고 제거하겠습니다. - 김병준 -

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import supabase from "../supabaseClient";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 import (글쓰기 에디터)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #004494;
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
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  border-radius: 8px;
  font-size: 18px;
  width: 100%;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .ql-container {
    height: 400px;
    overflow-y: auto;
    border: none;
  }

  .ql-editor {
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .ql-toolbar {
    border: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;


const CommitDetail = () => {
  const navigate = useNavigate(); // 홈으로~ 넘기기 위한 훅
  const [title, setTitle] = useState(''); // 글 제목(title)을 상태로 관리
  const [content, setContent] = useState(''); // 글 내용(content)을 상태로 관리
  const [titleError, setTitleError] = useState(''); // 제목 에러 메시지 띄우기 위해 상태로 관리
  const [contentError, setContentError] = useState(''); // 내용 에러 메시지 띄우기 위해 상태로 관리
  const [user, setUser] = useState(null); // 사용자 정보 상태 변수와 상태 변경 함수 지정

  // 글쓰기 페이지가 처음 렌더링 될 때 사용자가 로그인했는지 확인
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // supabase에서 사용자 정보 가져옵니다.
      // 유저 정보가 있어야만 글쓰기 페이지를 보여줍니다.
      if (user) {
        console.log("수파베이스에서 받아온 유저의 상태:", user)
        setUser(user); // 받아온 사용자 정보로 user 상태를 업데이트
        // 유저 정보가 없으면 로그인 페이지로 넘깁니다.
      } else {
        navigate('/login');
      }
    };

    checkUser();
    // 의존성 배열이 비어있는 것과 같습니다. 그런데 우리 프로젝트에 있는 ESLint 설정 파일에서
    // plugin:react-hooks/recommended
    // 위 설정 때문에 의존성 배열을 비워두지 않도록 권고하고 있습니다.
    // 따라서 변할 일이 없는 navigate 함수를 넣어놓은 것으로 의미는 없습니다. 빈 배열이나 마찬가지입니다.
  }, [navigate]);

  // title 필드의 값이 변경될 때 호출할 함수.
  // 길이가 20자 이상이면 경고를 띄우고 20자 미만이면 에러 메시지를 비웁니다.
  // 에러메시지를 굳이 상태로 정의한 이유는 사용자가 20자 이상으로 제목을 썼을 때
  // 실시간으로 메시지를 띄워주기 위해서(상태가 변경 됨에 따라서 리렌더링 하기 위해서)입니다.
  // 일반 변수로 호출하면 실시간 리렌더링이 되지 않습니다.
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length > 40) {
      setTitleError('제목은 최대 40자까지 작성 가능합니다.');
    } else {
      setTitleError('');
    }
    setTitle(value);
  };

  // 작성 버튼을 눌렀을 때(폼이 제출될 때) 호출할 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // valid는 유효성 검사를 위한 플래그 변수임. true로 초기화한 이유는 일반적으로는 글을 제대로 쓸 것이기 때문입니다.
    // supabase 테이블에 넣기 위한 유효성 검사 규칙은 아직 모릅니다.
    // 저의 편의상 추가한 유효성 검사입니다.
    let valid = true;

    // 제목 길이가 40자 미만이면 유효성 검사 false로 바꾸고 에러 메시지 출력.
    if (title.length > 40) {
      setTitleError('제목은 최대 40자까지 작성 가능합니다.');
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

    // 여기까지 통과했는데 유효성 검사가 true이면서 user 객체가 있으면(로그인 되어 있으면)
    // supabase posts 테이블을 참조(from)해서 데이터를 하나의 객체로 채워 넣습니다.(insert)
    if (valid && user) {
      if (window.confirm('정말 등록하시겠습니까?')) {
        // data는 나중에 사용할 수 있어서 일단 둡니다.
        const { data, error } = await supabase.from('posts').insert([{ title, content, user_id: user.id }]);
        if (error) {
          const errorMessage = translateErrorMessage(error.message, error.code);
          alert(`데이터 삽입 오류: ${errorMessage}`);
          navigate('/test');
        } else {
          alert('등록되었습니다');
          navigate('/test');
        }
      }
    }
  };

  // Supabase 오류 메시지를 한국어로 번역하는 함수. 오류 케이스를 아직 확인은 안 했습니다.
  const translateErrorMessage = (message, code) => {
    const translations = {
      'Invalid login credentials': '잘못된 로그인 자격 증명',
      'User already exists': '이미 존재하는 사용자',
      'User not found': '사용자를 찾을 수 없음',
      'duplicate key value violates unique constraint': '중복 키 값이 고유 제약 조건을 위반함',
      'violates foreign key constraint': '외래 키 제약 조건을 위반함',
      'cannot insert null value': 'null 값을 삽입할 수 없음',
      'Network request failed': '네트워크 요청 실패',
      'permission denied for table': '테이블에 대한 권한이 거부됨',
    };

    // 오류 코드에 따른 추가 처리
    if (code) {
      switch (code) {
        case '23505': // 예: 고유 제약 조건 위반
          return '이미 존재하는 데이터입니다.';
        case '23503': // 예: 외래 키 제약 조건 위반
          return '관련된 데이터가 없어 삽입할 수 없습니다.';
        default:
          return translations[message] || '알 수 없는 오류가 발생했습니다.';
      }
    }

    return translations[message] || '알 수 없는 오류가 발생했습니다.';
  };

  // 취소 버튼이 클릭될 때 호출할 함수.
  // 컨펌창을 띄울 것이고, 사용자가 경고에도 확인을 누르면 test 컴포넌트로 넘깁니다.(메인 뉴스피드 페이지)
  const handleCancel = () => {
    if (window.confirm('정말 취소하시겠습니까? 글 작성을 취소하시면 작성하신 내용이 모두 삭제되고 홈으로 이동됩니다.')) {
      navigate('/test');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }, { 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
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
        <EditorContainer>
          <ReactQuill
           value={content}
           onChange={setContent}
           placeholder="내용을 입력해주세요."
           modules={modules}
           style={{ height: '400px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          />
        </EditorContainer>
        {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
      </Form>
      <ButtonGroup>
        <Button onClick={handleSubmit}>등록</Button>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonGroup>
    </Container>
  );
};

export default CommitDetail;


// 참고
// CommitDetail 페이지에서 발생하는 findDOMNode에러는 quill 에디터에서
// 발생시키는 에러로 해결책이 없는 듯하니 무시해도 되는 것 같습니다.