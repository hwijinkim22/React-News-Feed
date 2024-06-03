import { useEffect, useState } from 'react';
import GlobalStyles from './Globalstyles';
import FetchData from "./components/FetchData";
import Router from './shared/Router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://nozekgjgeindgyulfapu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00");

const App = () => {
  const [posts, setPosts] = useState([]);
  const [signIn, setSignIn] = useState(false);

  const handleDataFetch = (data) => {
    setPosts(data);
  };

  async function checkSignIn() {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;

    setSignIn(isSignIn);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('posts').select();
      setPosts(data);
    };

    fetchData();
    checkSignIn();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkSignIn();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
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
