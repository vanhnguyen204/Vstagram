import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigators/Navigation';
import {navigationRef} from './src/utils/NavigationUtils';
import {View} from 'react-native';
import ModalLoading from './src/components/ModalLoading.tsx';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ModalLoading visible={true} />
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
