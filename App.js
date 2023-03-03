import React from "react";
import { StatusBar } from "react-native";
import LoginScreen from "./Components/Screens/LoginScreen";
import RegisterScreen from "./Components/Screens/RegisterScreen";
import AppProvider, { AppContext } from "./Context/AppContext";
import { APP_PAGES } from "./Context/settings";

function App() {
  return (
    <AppProvider>
      <NavWrapper />
    </AppProvider>
  );
}

const NavWrapper = () => {
  const { navPage, setNavPage } = React.useContext(AppContext);
  const onSetNavPage = (e) => {
    setNavPage(e);
  };

  React.useEffect(() => {
    console.log("App Nav: ", navPage);
  }, [navPage]);

  return (
    <>
      <StatusBar
        style="light"
        barStyle={"dark-content"}
        backgroundColor={"#fff"}
        hidden={false}
        translucent={true}
      />
      {navPage === APP_PAGES.APP.LOGIN && (
        <LoginScreen onSetNavPage={onSetNavPage} />
      )}
      {navPage === APP_PAGES.APP.REGISTER && <RegisterScreen />}
    </>
  );
};

export default App;
