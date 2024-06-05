import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomeFeed from '../components/HomeFeed';
import supabase from '../supabaseClient';

const Home = ({ posts, setPosts }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.refresh) {
      fetchPosts(); // 최신 데이터를 가져오는 함수 호출
    }
  }, [location.state]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.log('데이터 못 불러옴 => ', error);
    } else {
      setPosts(data); // 최신 데이터로 상태 업데이트
    }
  };

  return (
    <>
      <HomeFeed posts={posts} />
    </>
  );
};

export default Home;
