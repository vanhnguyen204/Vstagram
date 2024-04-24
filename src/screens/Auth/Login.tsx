import {View, Text, ActivityIndicator, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import Container from '../../components/Container';
import {appColors} from '../../assets/colors/appColors';
import ImageComponent from '../../components/ImageComponent';
import ButtonComponent from '../../components/ButtonComponent';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {
  navigate,
  navigatePush,
  navigateReplace,
} from '../../utils/NavigationUtils';
import {PageName} from '../../config/PageName';
import {useLoginStore} from '../../hooks/useLogin';
import {validateEmail, validatePass} from '../../utils/ValidateAuth';
import TextComponent from '../../components/TextComponent';
import {login} from '../../services/apis/auth';
import {userInforStore} from '../../hooks/useUserInfor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage';
import {User} from '../../models/UserModel';

const Login = () => {
  const loginStore = useLoginStore();
  const {setInforMation} = userInforStore();
  const [isLoading, setIsLoading] = useState(false);
  const goToRegister = useCallback(() => {
    navigatePush(PageName.Register);
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
  const handleLogin = useCallback(() => {
    const data = {
      email: loginStore.email,
      passWord: loginStore.passWord,
    };
    setIsLoading(true);
    login(data)
      .then(response => {
        setIsLoading(false);
        console.log('Login success', response);

        setInforMation(response);
        // @ts-ignore
        AsyncStorage.setItem(ACCESS_TOKEN, response.token)
          .then(() => {
            navigateReplace(PageName.BottomTab);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(
          'Lỗi đăng nhập',
          'Tài khoản hoặc mật khẩu không chính xác!',
        );
        setIsLoading(false);
      });
  }, [loginStore.email, loginStore.passWord, setInforMation]);
  return (
    <Container justifyContent="space-around">
      <ImageComponent
        alignSelf="center"
        width={200}
        height={60}
        src={require('../../assets/icons/icon-app.png')}
      />
      <Box padding={10}>
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
