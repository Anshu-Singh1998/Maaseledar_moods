import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { moderateScale } from 'react-native-size-matters';

// 🔹 Screens (make sure these exist)
import VendorDashboard from '../Screens/Dashboard/Dashboard';
import VendorOrdersList from '../Screens/OrderManagement/OrderListScreen';
import VendorOrderDetails from '../Screens/OrderManagement/OrderDetailsScreen';
import AddProduct from '../Screens/ProductManagement/AddProductScreen';
import EditProduct from '../Screens/ProductManagement/EditProductScreen';
import ProductList from '../Screens/ProductManagement/ProductListScreen';
import EarningsScreen from '../Screens/EarningsAndPayments/EarningsScreen';
import EditShop from '../Screens/ShopProfile/EditShopScreen';
import ShopProfile from '../Screens/ShopProfile/ShopProfileScreen';

// 🔹 Colors (use your theme ideally)
import Colors from '../../../../Constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShopProfile" component={ShopProfile} />
      <Stack.Screen name="EditShop" component={EditShop} />
    </Stack.Navigator>
  );
};

export const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

export const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdersList" component={VendorOrdersList} />
      <Stack.Screen name="OrderDetails" component={VendorOrderDetails} />
    </Stack.Navigator>
  );
};

const VendorStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        // 🔥 FLOATING TAB
        tabBarStyle: {
          position: 'absolute',
          bottom: moderateScale(20),
          left: moderateScale(16),
          right: moderateScale(16),
          height: moderateScale(65),
          borderRadius: moderateScale(20),
          backgroundColor: '#fff',
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },

        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'grid';
              break;
            case 'Orders':
              iconName = 'receipt';
              break;
            case 'Products':
              iconName = 'cube';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? Colors.primary : 'transparent',
                padding: moderateScale(10),
                borderRadius: moderateScale(12),
              }}
            >
              <Icon
                name={iconName}
                size={moderateScale(20)}
                color={focused ? '#fff' : '#9CA3AF'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={VendorDashboard} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Products" component={ProductStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default VendorStack;
