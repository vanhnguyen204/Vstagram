import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyle} from '../../styles/globalStyle';
import {appColors} from '../../assets/colors/appColors';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import ImageComponent from '../../components/ImageComponent';
import Box from '../../components/Box';
import {NavigationProp} from '@react-navigation/native';
import {PageName} from '../../config/PageName';
interface WelcomeScreenProps {
  navigation: NavigationProp<any>; // Thay any bằng kiểu dữ liệu cụ thể của màn hình tiếp theo
}
const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {navigation} = props;
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate(PageName.Register);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [navigation]);

  return (
    <Container justifyContent="space-around">
      <ImageComponent
        src={require('../../assets/icons/icon-app.png')}
        width={100}
        height={100}
      />
      <ActivityIndicator color={appColors.white} size={'large'} />
      <Box flex={0} backgroundColor={appColors.black}>
        <TextComponent value="from" />
        <TextComponent fontSize={20} value="Vanh" />
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
