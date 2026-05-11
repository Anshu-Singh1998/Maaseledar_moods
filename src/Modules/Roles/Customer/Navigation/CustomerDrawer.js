import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomerTabs, { SettingStack } from './CustomerStack'; // your bottom tab stack

// Screens / Stacks
import {
  CategoryStack,
  OrdersStack,
  ProfileStack,
} from '../Navigation/CustomerStack';
// (if you have stack)
import Cart from '../Screens/Cart/CartScreen';
import Wishlist from '../Screens/WishlistAndFavourites/WishlistScreen';
import Offers from '../Screens/Offers/OffersScreen';
import CustomerSettings from '../Screens/Settings/CustomerSettings';

// Theme
import Colors from '../../../../Constants/Colors';

const Drawer = createDrawerNavigator();

const CustomerDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        // 🎨 Colors
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: '#374151',

        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
        },
      }}
    >
      {/* 🔥 HOME (Tabs) */}
      <Drawer.Screen
        name="Home"
        component={CustomerTabs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 📂 CATEGORIES */}
      <Drawer.Screen
        name="Categories"
        component={CategoryStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🛒 CART */}
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 📦 ORDERS */}
      <Drawer.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="receipt-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ❤️ WISHLIST */}
      <Drawer.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🎁 OFFERS */}
      <Drawer.Screen
        name="Offers"
        component={Offers}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="pricetags-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 👤 PROFILE */}
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ⚙️ SETTINGS */}
      <Drawer.Screen
        name="Settings"
        component={SettingStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default CustomerDrawer;
