import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';

const Register = () => {
  return (
    <Container>
      <ImageComponent
        tinColor={appColors.white}
        width={200}
        height={60}
        src={require('../../assets/icons/text-app.png')}
      />
      <InputComponent
        value="hello"
        onChangeText={() => {}}
        label="Full Name"
        placeholder="Your full name"
        marginTop={8}
        marginBottom={10}
        padding={10}
        placeholderTextColor={appColors.gray}
      />
      <InputComponent
        value="hello"
        onChangeText={() => {}}
        label="Email"
        placeholder="Your email"
      />

    </Container>
  );
};

export default Register;
