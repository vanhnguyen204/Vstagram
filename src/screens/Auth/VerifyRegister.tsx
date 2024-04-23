import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import Container from '../../components/Container';
import {appColors} from '../../assets/colors/appColors';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import Box from '../../components/Box.tsx';
import Icon from 'react-native-vector-icons/AntDesign';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import {verifyCode} from '../../services/apis/auth.ts';
import {PageName} from '../../config/PageName.ts';
type VerifyRegisterProps = {
  route: RouteProp<any>;
};

const VerifyRegister = ({route}: VerifyRegisterProps) => {
  const data = route.params;
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const refs = useRef<TextInput[]>([]);

  const handleChangeText = useCallback(
    (index: number, value: string) => {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value && index < 5) {
        refs.current[index + 1].focus();
      } else if (!value && index > 0) {
        refs.current[index - 1].focus();
      }
    },
    [verificationCode],
  );

  const handleKeyPress = useCallback(
    (
      index: number,
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (
        event.nativeEvent.key === 'Backspace' &&
        !verificationCode[index] &&
        index > 0
      ) {
        refs.current[index - 1].focus();
      } else {
        refs.current[index].focus();
      }
    },
    [verificationCode],
  );
  const handleVerifyCode = useCallback(() => {
    const code = verificationCode.join('');
    const verifyData = {
      email: data?.email,
      codeRegister: +code,
    };
    verifyCode(verifyData)
      .then(response => {
        console.log(response);
        if (response?.status === 200) {
          navigatePush(PageName.CreatePasswordScreen, {email: data?.email});
          return;
        }
        Alert.alert('Mã xác nhận sai!');
      })
      .catch(e => {
        console.log(e);
      });
  }, [data?.email, verificationCode]);
  return (
    <Container backgroundColor={appColors.black} justifyContent={'flex-start'}>
      <ButtonComponent
        flexDirection="row"
        name="Register"
        onPress={() => {
          goBackNavigation();
        }}
        alignSelf="flex-start">
        <Icon name={'arrowleft'} size={20} color={appColors.white} />
      </ButtonComponent>
      <TextComponent
        alignSelf="flex-start"
        fontSize={20}
        value={'Nhập mã xác nhận'}
        marginHorizontal={15}
        color={appColors.white}
        marginTop={20}
        fontWeight="bold"
      />
      <Box alignItems={'center'}>
        <TextComponent
          alignSelf="flex-start"
          value={
            'Để xác nhận tài khoản của bạn, hãy nhập mã gồm 6 chữ số mà chúng tôi đã gửi đến địa chỉ'
          }
          marginHorizontal={15}
          color={appColors.white}
          marginTop={10}
        />
        <TextComponent
          alignSelf="flex-start"
          value={`${data?.email}`}
          marginHorizontal={15}
          color={appColors.white}
          marginBottom={20}
        />
        <FlatList
          style={styles.listStyle}
          horizontal={true}
          data={verificationCode}
          renderItem={({item, index}) => {
            return (
              <TextInput
                key={index}
                ref={ref => (refs.current[index] = ref as TextInput)}
                style={styles.input}
                value={item}
                onChangeText={value => handleChangeText(index, value)}
                onKeyPress={event => handleKeyPress(index, event)}
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0}
              />
            );
          }}
        />
        <ButtonComponent
          marginHorizontal={20}
          name={'Tiếp tục'}
          backgroundColor={appColors.white}
          onPress={() => {
            handleVerifyCode();
          }}
          nameColor={appColors.black}
          marginVertical={10}
        />
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: appColors.white,
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',
    borderRadius: 10,
    color: appColors.white,
  },
  listStyle: {
    maxHeight: 70,
  },
});

export default VerifyRegister;
