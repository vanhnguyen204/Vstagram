import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {useRegisterStore} from '../../hooks/useRegister';
import ButtonComponent from '../../components/ButtonComponent';
import {navigate, navigatePush} from '../../utils/NavigationUtils.ts';
import {PageName} from '../../config/PageName.ts';
import {register} from '../../services/apis/auth.ts';

const Register = () => {
  const {email, setEmail} = useRegisterStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = () => {
    // setIsLoading(true);
    const data = {
      email,
    };
    navigatePush(PageName.VerifyRegister, data);
    //
    // register(data)
    //   .then(res => {
    //     if (res){
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch(e => {
    //     console.log('Error email register!', e);
    //     setIsLoading(false);
    //   });
  };
  return (
    <Container
      justifyContent="center"
      backgroundColor={appColors.backgroundApp}>
      <ImageComponent
        marginBottom={20}
        alignSelf="center"
        tinColor={appColors.white}
        width={200}
        height={60}
        src={require('../../assets/icons/text-app.png')}
      />
      <Box
        marginVertical={10}
        flexDirection="row"
        radius={15}
        borderWidth={1}
        borderColor={appColors.white}>
        <InputComponent
          autoCapitalize={'none'}
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
      <ButtonComponent
        onPress={() => {
          handleRegister();
        }}
        name="Confirm"
        backgroundColor={appColors.white}
        nameColor={appColors.black}
        radius={15}>
        {isLoading && (
          <ActivityIndicator size={'small'} color={appColors.black} />
        )}
      </ButtonComponent>
    </Container>
  );
};

export default Register;
