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
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
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
                width={size}
                height={size}
                tinColor={color}
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
                src={iconBottomTab.searchIcon}
                width={size}
                height={size}
                tinColor={color}
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
                width={size}
                height={size}
                tinColor={color}
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
                height={size}
                tinColor={color}
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
                height={size}
                tinColor={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
