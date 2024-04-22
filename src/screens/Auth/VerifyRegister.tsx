import React, {useRef, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
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

  const handleChangeText = (index: number, value: string) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value && index < 5) {
      refs.current[index + 1].focus();
    } else if (!value && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (
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
  };

  return (
    <Container backgroundColor={appColors.black} justifyContent={'flex-start'}>
      <ButtonComponent
        flexDirection="row"
        name="Register"
        onPress={() => {
          
        }}
        alignSelf="flex-start">
        <Icon name={'arrowleft'} size={20} color={appColors.white} />
        <TextComponent fontSize={18} marginLeft={5} value="Register" />
      </ButtonComponent>

      <Box alignItems={'center'}>
        <TextComponent value={'Xác nhận email!'} color={appColors.white} />

        <FlatList
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
      </Box>

      <ButtonComponent
        marginHorizontal={20}
        name={'Tiếp tục'}
        backgroundColor={appColors.white}
        onPress={() => {}}
        nameColor={appColors.black}
      />
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
});

export default VerifyRegister;
