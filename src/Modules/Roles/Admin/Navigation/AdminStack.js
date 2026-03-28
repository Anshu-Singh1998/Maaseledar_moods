import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { moderateScale } from 'react-native-size-matters';

// 🔹 Screens (create these)
import AdminDashboard from '../Screens/Dashboard/Dashboard';
import AdminOrdersDetails from '../Screens/OrderManagement/OrderDetailsScreen';
import AdminOrdersList from '../Screens/OrderManagement/OrderListScreen';

import VendorsList from '../Screens/VendorManagement/VendorListScreen';
import VendorDetails from '../Screens/VendorManagement/VendorDetailsScreen';
import VendorApproval from '../Screens/VendorManagement/VendorApprovalScreen';

import UserList from '../Screens/UsersManagement/UserListScreen';
import UserDetails from '../Screens/UsersManagement/UserDetailsScreen';
import ProductList from '../Screens/ProductMonitoring/ProductListScreen';
import OfferList from '../Screens/OffersAndCouponsManagement/OfferListScreen';
import CreateOffer from '../Screens/OffersAndCouponsManagement/CreateOfferScreen';
import AdminSettings from '../Screens/Settings/Settings';

import AdminAnalytics from '../Screens/AnalyticsAndReports/AnalyticsScreen';

// 🔹 Theme
import Colors from '../../../../Constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersList" component={AdminOrdersList} />
      <Stack.Screen name="OrderDetails" component={AdminOrdersDetails} />
    </Stack.Navigator>
  );
};

export const VendorsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorsList" component={VendorsList} />
      <Stack.Screen name="VendorDetails" component={VendorDetails} />
      <Stack.Screen name="VendorApproval" component={VendorApproval} />
    </Stack.Navigator>
  );
};

export const UsersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

export const OffersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OfferList" component={OfferList} />
      <Stack.Screen name="CreateOffer" component={CreateOffer} />
    </Stack.Navigator>
  );
};

const AdminStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
tabBarActiveTintColor: '#fff',
tabBarInactiveTintColor: '#D1D5DB',
        // 🔥 FLOATING STYLE
        tabBarStyle: {
          position: 'absolute',
          bottom: moderateScale(20),
          left: moderateScale(16),
          right: moderateScale(16),
          height: moderateScale(65),
          borderRadius: moderateScale(20),
          backgroundColor: Colors.primary,

          elevation: 5,
          shadowOpacity: 0.05,

          paddingTop: 10, // ✅ ADD THIS
          paddingBottom: 10, // ✅ ADD THIS
        },

        tabBarIcon: ({ color, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Orders':
              iconName = focused ? 'receipt' : 'receipt-outline';
              break;
            case 'Vendors':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'Users':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }

          return <Icon name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Vendors" component={VendorsStack} />
      <Tab.Screen name="Users" component={UsersStack} />
    </Tab.Navigator>
  );
};

export default AdminStack;
