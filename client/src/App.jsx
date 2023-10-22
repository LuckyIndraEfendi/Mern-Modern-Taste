import { useEffect } from "react";
import { SignIn, SignUp, Home, About, Profile } from "./pages";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { gapi } from "gapi-script";
function App() {
  const initializeGapi = () => {
    gapi.client.init({
      clientId: "1068741602254-qbiqmp1ei5bfuj2q2i3cm9fcd6eeuimd.apps.googleusercontent.com",
      scope: "",
    });
  };
  useEffect(() =>{
    gapi.load("client:auth2", initializeGapi);
  },[])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
