import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./components/landingpage/Landingpage";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/homepage/Home";
// import Home1 from "./components/homepage/ServiceProviderDashboard";
import Profile from "./components/header/profile";
import Bookings from "./components/header/Bookings";
import HelpCentre from "./components/header/helpcentre";
import Notification from "./components/header/Notification";
import Setting from "./components/header/settings";
import ServiceProviderDashboard from "./components/homepage/ServiceProviderDashboard"

const App = () => (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/my-bookings' element={<Bookings/>}/>
          <Route path='/settings' element={<Setting/>}/>
          <Route path='/notifications' element={<Notification/>}/>
          <Route path='/help-centre' element={<HelpCentre/>}/>
          <Route path='/home1' element={<ServiceProviderDashboard/>}/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
);

export default App;
