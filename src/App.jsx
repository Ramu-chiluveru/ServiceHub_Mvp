import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./components/landingpage/Landingpage";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
const App = () => (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
);

export default App;
