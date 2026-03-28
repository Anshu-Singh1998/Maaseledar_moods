import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'; // ✅ ADD THIS

import AdminTabs from './AdminStack';
import { OffersStack } from '../Navigation/AdminStack';
import AdminAnalytics from '../Screens/AnalyticsAndReports/AnalyticsScreen';
import AdminSettings from '../Screens/Settings/Settings';

import Colors from '../../../../Constants/Colors'; // optional

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        // 🎨 COLORS
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: '#374151',

        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
        },
      }}
    >
      {/* 🔥 HOME */}
      <Drawer.Screen
        name="Home"
        component={AdminTabs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔻 OFFERS */}
      <Drawer.Screen
        name="Offers"
        component={OffersStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="pricetags-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔻 ANALYTICS */}
      <Drawer.Screen
        name="Analytics"
        component={AdminAnalytics}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔻 SETTINGS */}
      <Drawer.Screen
        name="Settings"
        component={AdminSettings}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;