import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  font-size: 1.125rem;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

main {
  margin-top: 8rem;
}

h1 {
  margin-left: 2rem;
}
h2 {
  text-align: center;
}
`;
