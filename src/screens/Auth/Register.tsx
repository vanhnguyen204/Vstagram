import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {useRegisterStore} from '../../hooks/useRegister';
import ButtonComponent from '../../components/ButtonComponent';

const Register = () => {
  const {
    fullName,
    email,
    passWord,
    confirmPassword,
    setFullName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useRegisterStore();
  return (
    <Container justifyContent="center">
      <ImageComponent
        marginBottom={20}
        alignSelf="center"
        tinColor={appColors.white}
        width={200}
        height={60}
        src={require('../../assets/icons/text-app.png')}
      />
      <Box
        flexDirection="row"
        radius={15}
        borderWidth={1}
        borderColor={appColors.white}>
        <InputComponent
          flex={1}
          value={fullName}
          onChangeText={(value: string) => {
            setFullName(value);
          }}
          placeholder="Your full name"
          marginTop={8}
          marginBottom={10}
          padding={10}
          textColor={appColors.white}
          placeholderTextColor={appColors.gray}
        />
      </Box>
      <Box
        marginVertical={10}
        flexDirection="row"
        radius={15}
        borderWidth={1}
        borderColor={appColors.white}>
        <InputComponent
          flex={1}
          value={email}
          marginTop={8}
          onChangeText={(value: string) => {
            setEmail(value);
          }}
          placeholder="Your email"
          padding={10}
          marginBottom={10}
          textColor={appColors.white}
          placeholderTextColor={appColors.gray}
        />
      </Box>

      <Box
        flexDirection="row"
        radius={15}
        borderWidth={1}
        borderColor={appColors.white}>
        <InputComponent
          value={passWord}
          marginTop={8}
          onChangeText={(value: string) => {
            setPassword(value);
          }}
          flex={1}
          placeholder="Your password"
          padding={10}
          marginBottom={10}
          textColor={appColors.white}
          placeholderTextColor={appColors.gray}
        />
      </Box>

      <Box
        flexDirection="row"
        radius={15}
        borderWidth={1}
        marginVertical={10}
        borderColor={appColors.white}>
        <InputComponent
          value={confirmPassword}
          marginTop={8}
          onChangeText={(value: string) => {
            setPassword(value);
          }}
          flex={1}
          placeholder="Confirm your password"
          padding={10}
          marginBottom={10}
          textColor={appColors.white}
          placeholderTextColor={appColors.gray}
        />
      </Box>
      <ButtonComponent
        onPress={() => {}}
        name="Confirm"
        backgroundColor={appColors.white}
        nameColor={appColors.black}
        radius={15}
      />
    </Container>
  );
};

export default Register;
