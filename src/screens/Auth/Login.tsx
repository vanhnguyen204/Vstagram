import {ActivityIndicator, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import Container from '../../components/Container';
import {appColors} from '../../assets/colors/appColors';
import ImageComponent from '../../components/ImageComponent';
import ButtonComponent from '../../components/ButtonComponent';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {navigatePush, navigateReplace} from '../../utils/NavigationUtils';
import {useLoginStore} from '../../hooks';
import {validateEmail, validatePass} from '../../utils/ValidateAuth';
import TextComponent from '../../components/TextComponent';
import {login} from '../../services/apis';
import {useUserInformation} from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, ACCESS_USER_ID} from '../../constants/AsyncStorage';
import {ROUTES} from '../../navigators';
import {User} from '../../models';
import {useChatStore} from '../../hooks/useChatStore.ts';

const Login = () => {
  const loginStore = useLoginStore();
  const {setInformation} = useUserInformation();
  const {socket, initialSocketIO} = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const goToRegister = useCallback(() => {
    navigatePush(ROUTES.Register);
  }, []);
  const onEmailChange = useCallback(
    (value: string) => {
      loginStore.setEmail(value);
      loginStore.setErrorEmail(validateEmail(value));
    },
    [loginStore],
  );
  const onPassChange = useCallback(
    (value: string) => {
      loginStore.setPassword(value);
      loginStore.setErrorPassword(validatePass(value));
    },
    [loginStore],
  );
  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const loginResponse: User = await login(
        loginStore.email,
        loginStore.passWord,
      );

      setIsLoading(false);
      console.log('Login success', loginResponse);
      setInformation(loginResponse);
      initialSocketIO(socket, loginResponse._id);
      await AsyncStorage.setItem(ACCESS_TOKEN, loginResponse.token);
      await AsyncStorage.setItem(ACCESS_USER_ID, loginResponse._id);
      navigateReplace(ROUTES.BottomTab);
    } catch (e) {
      Alert.alert('Lỗi đăng nhập', 'Tài khoản hoặc mật khẩu không chính xác!');
      setIsLoading(false);
    }
  }, [
    initialSocketIO,
    loginStore.email,
    loginStore.passWord,
    setInformation,
    socket,
  ]);
  return (
    <Container justifyContent="space-around">
      <ImageComponent
        alignSelf="center"
        width={200}
        height={60}
        src={require('../../assets/icons/icon-app.png')}
      />
      <Box padding={10} alignSelf={'stretch'}>
        <Box
          backgroundColor="transparent"
          marginVertical={10}
          flexDirection="row"
          radius={10}
          borderWidth={1}
          borderColor={appColors.white}>
          <InputComponent
            autoCapitalize={'none'}
            flex={1}
            value={loginStore.email}
            marginTop={8}
            onChangeText={(value: string) => {
              onEmailChange(value);
            }}
            placeholder="Email"
            padding={10}
            marginBottom={10}
            textColor={appColors.white}
            placeholderTextColor={appColors.gray}
          />
        </Box>
        {loginStore.errorEmail && (
          <TextComponent
            color={appColors.red}
            alignSelf="flex-start"
            value={loginStore.errorEmail}
          />
        )}
        <Box
          marginVertical={10}
          flexDirection="row"
          radius={10}
          borderWidth={1}
          borderColor={appColors.white}>
          <InputComponent
            autoCapitalize={'none'}
            flex={1}
            value={loginStore.passWord}
            marginTop={8}
            onChangeText={(value: string) => {
              onPassChange(value);
            }}
            placeholder="Mật khẩu"
            padding={10}
            marginBottom={10}
            textColor={appColors.white}
            placeholderTextColor={appColors.gray}
          />
        </Box>
        {loginStore.errorPassword && (
          <TextComponent
            marginBottom={10}
            color={appColors.red}
            alignSelf="flex-start"
            value={loginStore.errorPassword}
          />
        )}
        <ButtonComponent
          padding={10}
          onPress={() => {
            handleLogin();
          }}
          name="Tiếp tục"
          backgroundColor={appColors.blue500}
          nameColor={appColors.white}
          radius={15}>
          {isLoading && (
            <ActivityIndicator size={'small'} color={appColors.black} />
          )}
        </ButtonComponent>
      </Box>
      <ButtonComponent
        padding={10}
        marginHorizontal={10}
        onPress={goToRegister}
        name="Tạo tài khoản mới"
        backgroundColor={'transparent'}
        nameColor={appColors.blue500}
        borderColor={appColors.blue500}
        borderWidth={1}
        radius={15}
      />
    </Container>
  );
};

export default Login;
