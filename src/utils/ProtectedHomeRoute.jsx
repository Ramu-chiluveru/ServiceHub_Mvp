import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CustomerHome from "../components/CustomerHomepage/Home";
import ServiceProviderDashboard from '../components/ProviderHomepage/ServiceProviderDashboard';
import { useState,useEffect } from 'react';

const ProtectedHomeRoute = () => {
  
  const role = Cookies.get('role');

  console.log(role);

  if (role === 'CUSTOMER') 
  {
    return <CustomerHome/>;
  } 
  else if (role === 'PROVIDER') 
  {
    return <ServiceProviderDashboard />;
  } 
  else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedHomeRoute;
