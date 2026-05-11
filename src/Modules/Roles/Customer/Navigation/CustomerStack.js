import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';

// 🔹 Screens
import Dashboard from '../Screens/Dashboard/Dashboard';
import Categories from '../Screens/Categories/Categories';
import CategoriesList from '../Screens/Categories/CategoryListScreen';
import ProductList from '../Screens/Product/ProductListScreen';
import ProductDetails from '../Screens/Product/ProductDetailsScreen';

import Cart from '../Screens/Cart/CartScreen';
import Checkout from '../Screens/Checkout/CheckoutScreen';
import Address from '../Screens/Checkout/AddressScreen';

import OrdersList from '../Screens/Orders/OrderListScreen';
import OrderDetails from '../Screens/Orders/OrderDetailsScreen';

import Profile from '../Screens/Profile/ProfileScreen';
import EditProfile from '../Screens/Profile/EditProfileScreen';

import Wishlist from '../Screens/WishlistAndFavourites/WishlistScreen';
import Offers from '../Screens/Offers/OffersScreen';

// 🔹 Theme
import Colors from '../../../../Constants/Colors';
import CustomerSettingsScreen from '../Screens/Settings/CustomerSettings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ================= STACKS ================= */

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={Dashboard} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductList" component={ProductList} />
    </Stack.Navigator>
  );
};

export const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoriesList" component={CategoriesList} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

export const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersList" component={OrdersList} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Offers" component={Offers} />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CustomerSettings"
    >
      <Stack.Screen
        name="CustomerSettings"
        component={CustomerSettingsScreen}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

/* ================= MAIN TAB ================= */

const CustomerStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#D1D5DB',

        // 🔥 Floating Tab Style
        tabBarStyle: {
          position: 'absolute',
          bottom: moderateScale(0),
          left: moderateScale(0),
          right: moderateScale(0),
          height: moderateScale(80),
          borderRadius: moderateScale(20),
          backgroundColor: Colors.orange,
          elevation: 5,
          shadowOpacity: 0.05,
          paddingTop: 10,
          paddingBottom: 10,
        },

        tabBarIcon: ({ color, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'CategoriesTab':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Orders':
              iconName = focused ? 'receipt' : 'receipt-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="CategoriesTab" component={CategoryStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default CustomerStack;
