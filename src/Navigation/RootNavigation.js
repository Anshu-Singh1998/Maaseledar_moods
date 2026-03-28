import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import CustomerDrawer from '../../src/Modules/Roles/Customer/Navigation/CustomerDrawer';

import VendorDrawer from '../../src/Modules/Roles/Vendor/Navigation/VendorDrawer';

import AdminDrawer from '../../src/Modules/Roles/Admin/Navigation/AdminDrawer';
import { AuthStack } from '../Navigation/StackNavigation';

const RootNavigation = () => {
  const { isLoggedIn, role } = useSelector(state => state.auth);

  const renderStack = () => {
    // 🔐 Not logged in
    if (!isLoggedIn) return <AuthStack />;

    // ⚠️ Safety check (important for async cases)
    if (!role) return <AuthStack />;

    // 🎯 Role-based routing
    switch (role) {
      case 'customer':
        return <CustomerDrawer />;

      case 'vendor':
        return <VendorDrawer />;

      case 'admin':
        return <AdminDrawer />;

      default:
        return <AuthStack />; // fallback
    }
  };

  return <NavigationContainer>{renderStack()}</NavigationContainer>;
};

export default RootNavigation;
