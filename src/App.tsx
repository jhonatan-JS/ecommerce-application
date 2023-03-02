import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import UserProvider from "../src/contexts/user";
import { GlobalStyle } from "./styles/global";
import Header from "./components/Header";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <UserProvider>
          <Router>
            <Header />
            <Routes />
            <GlobalStyle />
          </Router>
        </UserProvider>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
