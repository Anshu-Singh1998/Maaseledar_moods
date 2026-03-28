import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';

import {
 HomeStack, CategoriesStack, FavouritesStack, ProfileStack, AuthStack 
} from './StackNavigation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#555',
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
        },
        tabBarStyle: {
          height: moderateScale(60),
          paddingBottom: moderateScale(6),
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'category';
              break;
            case 'Favourites':
              iconName = 'favorite';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return (
            <Icon
              name={iconName}
              size={focused ? moderateScale(24) : moderateScale(22)}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack}  />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Favourites" component={FavouritesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;