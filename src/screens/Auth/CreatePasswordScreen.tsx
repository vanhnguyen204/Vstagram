import React, {useCallback} from 'react';
import Container from '../../components/Container';
import ButtonComponent from '../../components/ButtonComponent';
import {goBackNavigation, navigateAndReset} from '../../utils/NavigationUtils';
import {appColors} from '../../assets/colors/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import TextComponent from '../../components/TextComponent';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {useRegisterStore} from '../../hooks/useRegister';
import {validateConfirmPass, validatePass} from '../../utils/ValidateAuth';
import {createAccount} from '../../services/apis/auth';
import {Alert} from 'react-native';
import {ROUTES} from '../../navigators';

const CreatePasswordScreen = () => {
  const {
    email,
    passWord,
    confirmPassword,
    errorPassword,
    errorConfirmPassword,
    setPassword,
    setConfirmPassword,
    setErrorPassword,
    setErrorConfirmPassword,
    setEmail,
  } = useRegisterStore();
  const onPasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      setErrorPassword(validatePass(value));
    },
    [setErrorPassword, setPassword],
  );
  const onConfirmPasswordChange = useCallback(
    (pass: string, confirm: string) => {
      setConfirmPassword(confirm);
      setErrorConfirmPassword(validateConfirmPass(pass, confirm));
    },
    [setConfirmPassword, setErrorConfirmPassword],
  );
  const clearFormRegister = useCallback(() => {
    setPassword('');
    setConfirmPassword('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    setEmail('');
  }, [
    setConfirmPassword,
    setEmail,
    setErrorConfirmPassword,
    setErrorPassword,
    setPassword,
  ]);
  const goBack = useCallback(() => {
    goBackNavigation();
    setPassword('');
    setConfirmPassword('');
    setErrorPassword('');
    setErrorConfirmPassword('');
  }, [
    setConfirmPassword,
    setErrorConfirmPassword,
    setErrorPassword,
    setPassword,
  ]);
  const confirmRegisterAccount = useCallback(async () => {
    const account = {
      email: email,
      passWord: passWord,
    };

    createAccount(account)
      .then(() => {
        Alert.alert(
          'Thông báo',
          'Tạo tài khoản thành công, quay lại trang đăng nhập.',
          [
            {
              text: 'Quay lại',

              onPress: () => {
                navigateAndReset([{name: ROUTES.Login}]);
                clearFormRegister();
              },
            },
          ],
        );
      })
      .catch(e => {
        console.log(e);
      });
  }, [clearFormRegister, email, passWord]);
  return (
    <Container justifyContent={'flex-start'}>
      <ButtonComponent
        flexDirection="row"
        name="Register"
        onPress={goBack}
        alignSelf="flex-start">
        <Icon name={'arrowleft'} size={20} color={appColors.white} />
      </ButtonComponent>
      <Box marginHorizontal={10}>
        <TextComponent
          value="Tạo mật khẩu cho tài khoản!"
          alignSelf="flex-start"
          fontSize={20}
        />

        <Box
          marginVertical={10}
          flexDirection="row"
          radius={10}
          borderWidth={1}
          borderColor={appColors.white}>
          <InputComponent
            autoCapitalize={'none'}
            flex={1}
            value={passWord}
            onChangeText={(text: string) => {
              onPasswordChange(text);
            }}
            padding={10}
            placeholder="Mật khẩu"
          />
        </Box>
        {errorPassword && (
          <TextComponent
            alignSelf="flex-start"
            color={appColors.red}
            value={errorPassword}
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
            value={confirmPassword}
            onChangeText={(text: string) => {
              onConfirmPasswordChange(passWord, text);
            }}
            padding={10}
            placeholder="Xác nhận mật khẩu"
          />
        </Box>
        {errorConfirmPassword && (
          <TextComponent
            alignSelf="flex-start"
            color={appColors.red}
            value={errorConfirmPassword}
          />
        )}
      </Box>
      <ButtonComponent
        name="Confirm"
        onPress={() => {
          confirmRegisterAccount();
        }}
        backgroundColor={appColors.white}
        nameColor={appColors.black}
        marginHorizontal={10}
      />
    </Container>
  );
};

export default CreatePasswordScreen;
