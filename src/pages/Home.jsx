import HomeFeed from '../components/HomeFeed';
import HomeHeader from '../components/HomeHeader';

const Home = ({ posts }) => {
  return (
    <>
      <HomeFeed posts={posts} />
    </>
  );
};

export default Home;
