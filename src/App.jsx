import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./components/landingpage/Landingpage";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Profile from "./components/header/profile";
import Bookings from "./components/header/Bookings";
import HelpCentre from "./components/header/helpcentre";
import Notification from "./components/header/Notification";
import Setting from "./components/header/settings";
import ProtectedHomeRoute from "./utils/ProtectedHomeRoute";
import ServiceProviderDashboard from "./components/ProviderHomepage/ServiceProviderDashboard";
import MyRequests from "./components/CustomerHomepage/MyRequests";

const App = () => (
  <div className="flex flex-col min-h-screen overflow-y-hidden">
    <BrowserRouter>
      <Header />
      <div className="flex-1 overflow-y-hidden"> {/* Prevent global scroll */}
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedHomeRoute />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<Bookings />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/help-centre" element={<HelpCentre />} />
          <Route path="/home1" element={<ServiceProviderDashboard />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
