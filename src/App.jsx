import Router from './shared/Router';
import GlobalStyles from './Globalstyles';
import FetchData from "./components/FetchData";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router />
      <FetchData/>
    </>
  );
};

export default App;
