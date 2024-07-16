import React from 'react';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {observer} from 'mobx-react-lite';

const SettingScreen = observer(() => {
  return (
    <View style={styles.container}>
      <TextComponent value={'Setting'} />
      {/*<ButtonComponent*/}
      {/*  name={'Đăng xuất'}*/}
      {/*  onPress={async () => {*/}
      {/*    await AsyncStorage.setItem(ACCESS_USER_ID, '');*/}
      {/*    await AsyncStorage.setItem(ACCESS_TOKEN, '');*/}

      {/*    navigateAndReset([{name: ROUTES.Login}]);*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<TextComponent value={reelStore.reels.length} />*/}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black900,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: appColors.white,
    fontSize: 24,
    marginTop: 10,
  },
});

export default SettingScreen;
