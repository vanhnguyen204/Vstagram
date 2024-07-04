import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation';
import {navigationRef} from './src/utils/NavigationUtils';
import {View} from 'react-native';
import ModalLoading from './src/components/ModalLoading.tsx';
import {useAppStore} from './src/hooks';

const App = () => {
  const {visibleModalLoading} = useAppStore();
  return (
    <View style={{flex: 1}}>
      <ModalLoading visible={visibleModalLoading} />
      <NavigationContainer
        ref={ref => {
          navigationRef.current = ref;
        }}>
        <Navigation />
      </NavigationContainer>
    </View>
  );
};

export default App;
