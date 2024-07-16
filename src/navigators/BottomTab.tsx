import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import EmptyScreen from '../screens/EmptyScreen';
import ReelsScreen from '../screens/ReelsScreen';
import SettingScreen from '../screens/SettingScreen';
import ImageComponent from '../components/ImageComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import {iconBottomTab} from '../styles/iconBottomTab.ts';
import {ROUTES} from './Routes.ts';
import {BottomTabParams} from './BottomTabParams.ts';
import ButtonComponent from '../components/ButtonComponent.tsx';
import {navigatePush} from '../utils/NavigationUtils.ts';
import Box from '../components/Box.tsx';
import {MediaType} from '../models/Enum.ts';

const Tab = createBottomTabNavigator<BottomTabParams>();
const BottomTab = () => {
  const bottomTabRoutes = [
    ROUTES.Home,
    ROUTES.Search,
    ROUTES.EmptyScreen,
    ROUTES.Reels,
    ROUTES.Setting,
  ];

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Home}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: appColors.backgroundApp,
            borderTopWidth: 0,
            display: route.name === ROUTES.PostEditorScreen ? 'none' : 'flex',
          },
        ],
        tabBarActiveTintColor: appColors.white,
        tabBarIcon: ({size, color}) => {
          if (
            bottomTabRoutes.includes(route.name) &&
            route.name !== ROUTES.EmptyScreen
          ) {
            return (
              <ImageComponent
                alignSelf={'center'}
                tintColor={color}
                src={iconBottomTab[route.name]}
                height={size}
                width={size}
              />
            );
          } else {
            return (
              <Box flex={1} alignSelf={'stretch'} justifyContent={'center'}>
                <ButtonComponent
                  alignSelf={'stretch'}
                  onPress={() =>
                    navigatePush(ROUTES.Album, {
                      mediaType: {
                        type: MediaType.POSTS,
                        multipleImage: true,
                        title: 'Bài viết mới',
                      },
                    })
                  }>
                  <ImageComponent
                    alignSelf={'center'}
                    tintColor={color}
                    src={iconBottomTab[route.name]}
                    height={size}
                    width={size}
                  />
                </ButtonComponent>
              </Box>
            );
          }
        },
      })}>
      <Tab.Screen name={ROUTES.Home} component={HomeScreen} />
      <Tab.Screen name={ROUTES.Search} component={SearchScreen} />
      <Tab.Screen name={ROUTES.EmptyScreen} component={EmptyScreen} />
      {/*@ts-ignore*/}
      <Tab.Screen name={ROUTES.Reels} component={ReelsScreen} />
      <Tab.Screen name={ROUTES.Setting} component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
