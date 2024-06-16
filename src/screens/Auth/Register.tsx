import {ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import Box from '../../components/Box';
import InputComponent from '../../components/InputComponent';
import {useRegisterStore} from '../../hooks/useRegister';
import ButtonComponent from '../../components/ButtonComponent';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import {register} from '../../services/apis/auth.ts';
import Icon from 'react-native-vector-icons/AntDesign';
import {ROUTES} from '../../navigators';

const Register = () => {
  const {email, setEmail} = useRegisterStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = () => {
    setIsLoading(true);
    register(email)
      .then(res => {
        if (res.code === 201) {
          navigatePush(ROUTES.VerifyRegister, {email});
        } else {
          Alert.alert(
            'Thông báo',
            'Tài khoản đã tồn tại, vui lòng quay lại trang đăng nhập.',
          );
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.log('Error email register!', e);
        setIsLoading(false);
      });
  };
  return (
    <Container
      justifyContent="flex-start"
      backgroundColor={appColors.backgroundApp}>
      <ButtonComponent
        flexDirection="row"
        name="Register"
        onPress={() => {
          goBackNavigation();
        }}
        alignSelf="flex-start">
        <Icon name={'arrowleft'} size={20} color={appColors.white} />
      </ButtonComponent>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor={appColors.transparent}>
        <ImageComponent
          marginBottom={20}
          tintColor={appColors.white}
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
          disabled={isLoading}
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
      </Box>
    </Container>
  );
};

export default Register;
