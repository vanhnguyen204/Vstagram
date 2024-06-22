import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {PageName} from '../config/PageName.ts';
import SearchScreen from '../screens/SearchScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ReelsScreen from '../screens/ReelsScreen';
import SettingScreen from '../screens/SettingScreen';
import ImageComponent from '../components/ImageComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import {iconBottomTab} from '../styles/iconBottomTab.ts';
import {ROUTES} from './Routes.ts';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={PageName.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: appColors.backgroundApp,
            borderTopWidth: 0,
          },
        ],
        tabBarActiveTintColor: appColors.white,
      }}>
      <Tab.Screen
        name={PageName.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.homeIcon}
                alignSelf={'center'}
                width={size}
                height={size}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.SearchScreen}
        component={SearchScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                alignSelf={'center'}
                src={iconBottomTab.searchIcon}
                width={size}
                height={size}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.CreatePostScreen}
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.createPostIcon}
                alignSelf={'center'}
                width={size}
                height={size}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.ReelsScreen}
        component={ReelsScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.reelsIcon}
                width={size}
                alignSelf={'center'}
                height={size}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PageName.SettingScreen}
        component={SettingScreen}
        options={{
          tabBarIcon: ({size, color}) => {
            return (
              <ImageComponent
                src={iconBottomTab.settingIcon}
                width={size}
                alignSelf={'center'}
                height={size}
                tintColor={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
