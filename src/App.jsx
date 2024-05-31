import Router from './shared/Router';
import GlobalStyles from './Globalstyles';
import FetchData from "./components/FetchData";
import { useState } from 'react';

const App = () => {

  const [posts, setPosts] = useState([]);

  const handleDataFetch = (data) => {
    setPosts(data);
  };

  return (
    <>
      <GlobalStyles />
      <FetchData onDataFetch={handleDataFetch} />
      <Router posts={posts} />
    </>
  );
};

export default App;
