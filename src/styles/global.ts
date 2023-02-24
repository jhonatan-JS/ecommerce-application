import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  primary: "#014040",
  secondary: "#04D361",
  tertiary: "#7F7F7F",
  border: "#9B9B9B",
  divider: "#CCCCCC",
  arrow: "#595959",
  backgroundInput: "#EEEEEE",
  black: "#000000",
  white: "#FFFFFF",
  error: "#CD0D15",
};

export const DescriptionText = styled.text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.secondary};
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    font-size: 14.40px;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    color: ${colors.white};
    background-color: #E5E5E5;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.backgroundInput};
  }

  body, input, button {
    font-size: 20px;
    height: 100%;
    font-family: 'Roboto', serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;

    color: ${colors.black};
  }

  button {
    cursor: pointer;
  }
`;
