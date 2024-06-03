import React from 'react';
import supabase from '../supabaseClient';
import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: posts, error } = await supabase.from('posts').select('id, title').eq('user_id', user.id);
        if (error) {
          console.error('Error fetching posts', error);
        } else {
          setPostList(posts);
        }
      }
    };
    fetchPosts();
  }, []);
  const nicknameChange = () => {
    alert('hi');
  };
  return (
    <Container>
      <MyPageDiv>마이 페이지</MyPageDiv>

      <Profiles>
        <Profile>
          <Avatar src={user?.user_metadata?.avatar_url || ''} alt="User Avatar" />
        </Profile>
        <Profile>{user?.user_metadata?.nickname || user?.email}</Profile>
        <Profile onClick={nicknameChange}>✒️</Profile>
      </Profiles>

      <Notes>
        {postList.map((post) => {
          return (
            <Note key={post.id}>
              <Content>{post.title}</Content>
            </Note>
          );
        })}
      </Notes>
    </Container>
  );
};

export default MyPage;
