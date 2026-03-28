import * as React from 'react';
import { View, Text } from 'react-native';

import Login from '../Modules/Auth/Login';
import Register from '../Modules/Auth/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerToggleButton from './DrawerToggleButton';

/* -------- Stack Instances -------- */

const AuthStackNav = createNativeStackNavigator();

/* -------- Stack Components -------- */
const AuthStack = () => {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Login" component={Login} />
      <AuthStackNav.Screen name="Register" component={Register} />
      {/* later: Signup, OTP, ForgotPassword */}
    </AuthStackNav.Navigator>
  );
};

/* -------- Exports -------- */
export { AuthStack };
