import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation';
import {navigationRef} from './src/utils/NavigationUtils';
import {AppState, AppStateStatus, View} from 'react-native';
import ModalLoading from './src/components/ModalLoading.tsx';
import {useAppStore, useUserInformation} from './src/hooks';
import {useChatStore} from './src/hooks/useChatStore.ts';
import {getDataAsyncStorage} from './src/utils/AsyncStorage.ts';
import {ACCESS_USER_ID} from './src/constants/AsyncStorage.ts';
import {activeUserActivity} from './src/services/apis/socketService.ts';
import {showNotification} from './src/config/PushNotification.ts';
import {Provider} from 'react-redux';
import { store } from "./src/stores/store.ts";

const App = () => {
  const {visibleModalLoading} = useAppStore();
  const {socket, initialSocketIO} = useChatStore();
  const {information} = useUserInformation();
  const handleConnectSocket = useCallback(async () => {
    try {
      const getUserId = await getDataAsyncStorage(ACCESS_USER_ID);
      if (getUserId !== '') {
        initialSocketIO(socket, getUserId);
      }
    } catch (e) {
      console.log(e);
    }
  }, [initialSocketIO, socket]);

  const handleAppStateChange = useCallback(async () => {
    try {
      AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') {
          // do something when active the app
        } else {
          activeUserActivity('offline');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    handleConnectSocket();
    handleAppStateChange();
  }, [handleAppStateChange, handleConnectSocket]);

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <ModalLoading visible={visibleModalLoading} />
        <NavigationContainer
          ref={ref => {
            navigationRef.current = ref;
          }}>
          <Navigation />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
