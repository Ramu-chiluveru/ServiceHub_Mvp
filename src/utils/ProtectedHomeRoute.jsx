import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CustomerHome from "../components/CustomerHomepage/Home";
import ServiceProviderDashboard from '../components/ProviderHomepage/ServiceProviderDashboard';

const ProtectedHomeRoute = () => {
  const userType = Cookies.get('userType');

  if (userType === 'customer') {
    return <CustomerHome/>;
  } else if (userType === 'provider') {
    return <ServiceProviderDashboard />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedHomeRoute;
