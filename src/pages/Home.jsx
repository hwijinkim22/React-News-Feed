import HomeFeed from '../components/HomeFeed';

const Home = ({ posts }) => {
  return (
    <>
      <HomeFeed posts={posts} />
    </>
  );
};

export default Home;
