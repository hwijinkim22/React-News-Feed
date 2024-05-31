import { useEffect, useState } from 'react';
import GlobalStyles from './Globalstyles';
import FetchData from "./components/FetchData";
import Router from './shared/Router';

const App = () => {
  const [posts, setPosts] = useState([]);

  const handleDataFetch = (data) => {
    setPosts(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('posts').select();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <GlobalStyles />
      <FetchData onDataFetch={handleDataFetch} />
      <Router posts={posts} />
    </>
  );
};

export default App;
