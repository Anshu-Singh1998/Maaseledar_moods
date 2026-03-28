import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import VendorTabs from './VendorStack'; // 👈 tabs
import EarningsScreen from '../Screens/EarningsAndPayments/EarningsScreen';

const Drawer = createDrawerNavigator();

const VendorDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      
      {/* 🔥 MAIN APP */}
      <Drawer.Screen name="Home" component={VendorTabs} />

      {/* 🔻 Drawer Screens */}
      <Drawer.Screen name="Earnings" component={EarningsScreen} />

    </Drawer.Navigator>
  );
};

export default VendorDrawer;