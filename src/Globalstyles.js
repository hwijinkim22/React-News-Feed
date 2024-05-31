import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  }
  
`;

export default GlobalStyles;
